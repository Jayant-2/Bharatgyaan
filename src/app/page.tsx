import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  GraduationCap,
  ScrollText,
  Video as VideoIcon,
  ShieldCheck,
  CheckCircle2,
  Atom,
  HeartPulse,
  Compass,
  Palette,
  Clock,
  ExternalLink,
  Layers,
  AlertTriangle,
  Star,
  Users,
  Award,
} from "lucide-react";
import {
  getPlatformStats,
  getFeaturedTopics,
  getPopularLessons,
  getRecentLessons,
  getFeaturedVideos,
} from "@/server/services/content";
import { CLAIM_BADGES, ClaimType, cn } from "@/lib/utils";
import { Badge, Skeleton, SkeletonCard, EmptyState } from "@/components/ui";

export const revalidate = 60;

// ── Metadata ──────────────────────────────────────────────────────────────
export const metadata = {
  title: "BharatGyaan — AI-Powered Indian Knowledge Systems Learning Platform",
  description:
    "Explore Indian Mathematics, Astronomy, Ayurveda, Yoga, Philosophy and more — structured lessons verified with primary sources and a grounded AI tutor.",
};

// ── Evidence badge helper ────────────────────────────────────────────────
function EvidenceBadge({ claimType }: { claimType: ClaimType }) {
  const badge = CLAIM_BADGES[claimType] || CLAIM_BADGES.scholarly;
  return (
    <span
      className={cn("badge", `badge-${claimType}`)}
      title={badge.description}
    >
      <ShieldCheck className="w-3 h-3" aria-hidden="true" />
      {badge.label}
    </span>
  );
}

// ── Category icon helper ─────────────────────────────────────────────────
function CategoryIcon({ slug }: { slug?: string }) {
  switch (slug) {
    case "knowledge-science": return <Atom className="w-5 h-5" aria-hidden="true" />;
    case "health-lifestyle": return <HeartPulse className="w-5 h-5" aria-hidden="true" />;
    case "philosophy-education": return <Compass className="w-5 h-5" aria-hidden="true" />;
    case "culture-arts": return <Palette className="w-5 h-5" aria-hidden="true" />;
    default: return <Layers className="w-5 h-5" aria-hidden="true" />;
  }
}

// ── Main Page ─────────────────────────────────────────────────────────────
export default async function HomePage() {
  const [stats, featuredTopics, popularLessons, recentLessons, featuredVideos] =
    await Promise.all([
      getPlatformStats(),
      getFeaturedTopics(6),
      getPopularLessons(3),
      getRecentLessons(4),
      getFeaturedVideos(3),
    ]);

  return (
    <div className="flex flex-col">

      {/* ── 1. HERO ─────────────────────────────────────────────────── */}
      <section
        aria-label="Welcome to BharatGyaan"
        className="relative overflow-hidden border-b border-[var(--border)]"
        style={{ background: "var(--background)" }}
      >
        {/* Subtle jaali pattern */}
        <div className="absolute inset-0 bg-jaali-pattern pointer-events-none" aria-hidden="true" />
        {/* Warm glow orb */}
        <div
          className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-gradient-to-br from-saffron-300/12 to-terracotta-300/8 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="container-page relative py-16 lg:py-24">
          <div className="max-w-5xl mx-auto text-center">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron-50 dark:bg-saffron-950/40 border border-saffron-200 dark:border-saffron-800 text-saffron-800 dark:text-saffron-300 text-xs sm:text-sm font-semibold tracking-wide mb-8 shadow-warm-sm">
              <Sparkles className="w-3.5 h-3.5 text-saffron-600" aria-hidden="true" />
              <span>Structured · Source-Verified · Grounded AI Pedagogy</span>
            </div>

            {/* H1 */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--foreground)] tracking-tight leading-[1.12] text-balance mb-6">
              Explore the Depths of{" "}
              <span className="bg-gradient-to-r from-saffron-600 via-terracotta-600 to-indigoInk-700 bg-clip-text text-transparent">
                Indian Knowledge Systems
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed mb-10">
              Bridging timeless Indic scientific traditions, mathematical discoveries,
              holistic healthcare, and philosophical inquiry with modern rigorous scholarship.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/introduction"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-saffron-600 to-terracotta-600 hover:from-saffron-700 hover:to-terracotta-700 shadow-warm hover:shadow-warm-lg transition-all duration-200 text-base group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500 focus-visible:ring-offset-2"
              >
                <BookOpen className="w-5 h-5" aria-hidden="true" />
                <span>Start Learning IKS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <Link
                href="/tutor"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-[var(--foreground)] bg-[var(--card)] border border-[var(--border)] hover:bg-[var(--muted)] shadow-card hover:shadow-card-hover transition-all duration-200 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2"
              >
                <Sparkles className="w-5 h-5 text-saffron-600" aria-hidden="true" />
                <span>Ask IKS AI Tutor</span>
              </Link>
            </div>

            {/* Stats row */}
            {(stats.totalLessons > 0 || stats.totalTopics > 0) && (
              <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-[var(--muted-foreground)]">
                {[
                  { value: stats.totalTopics, label: "Subject Areas" },
                  { value: stats.totalLessons, label: "Verified Lessons" },
                  { value: stats.totalVideos, label: "Curated Videos" },
                  { value: stats.totalSources, label: "Primary Sources" },
                ].map(({ value, label }) =>
                  value > 0 ? (
                    <div key={label} className="text-center">
                      <p className="text-2xl font-bold font-serif text-[var(--foreground)]">{value}+</p>
                      <p className="text-xs mt-0.5">{label}</p>
                    </div>
                  ) : null
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 2. WHAT IS IKS ──────────────────────────────────────────── */}
      <section aria-labelledby="what-is-iks-heading" className="section-padding border-b border-[var(--border)] bg-[var(--background-secondary)]">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 id="what-is-iks-heading" className="font-serif text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4">
              What is Indian Knowledge Systems (IKS)?
            </h2>
            <p className="text-[var(--muted-foreground)] leading-relaxed">
              IKS encompasses India's millennia-old traditions of scientific inquiry, philosophical reasoning, and practical wisdom — grounded in verifiable primary texts.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: <ScrollText className="w-6 h-6" aria-hidden="true" />,
                title: "Primary Source Grounded",
                desc: "Every claim is traced to a verified manuscript, critical edition, or peer-reviewed academic publication. No unsourced assertions.",
                color: "text-amber-600",
                bg: "bg-amber-50 dark:bg-amber-950/30",
              },
              {
                icon: <Sparkles className="w-6 h-6" aria-hidden="true" />,
                title: "Structured Curriculum",
                desc: "Organized into 12 subject domains with sequential lessons — from foundational introductions to advanced scholarly analysis.",
                color: "text-indigo-600",
                bg: "bg-indigo-50 dark:bg-indigo-950/30",
              },
              {
                icon: <ShieldCheck className="w-6 h-6" aria-hidden="true" />,
                title: "Evidence Transparency",
                desc: "Each lesson section carries an evidence label: Historical Record, Traditional Belief, Scholarly Interpretation, or Scientific Evidence.",
                color: "text-emerald-600",
                bg: "bg-emerald-50 dark:bg-emerald-950/30",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="card p-6 space-y-4"
              >
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", item.bg, item.color)}>
                  {item.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-[var(--foreground)]">{item.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. FEATURED TOPICS ────────────────────────────────────────── */}
      {featuredTopics.length > 0 && (
        <section aria-labelledby="topics-heading" className="section-padding border-b border-[var(--border)]">
          <div className="container-page">
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-50 dark:bg-saffron-950/40 text-saffron-800 dark:text-saffron-300 text-xs font-semibold uppercase tracking-wider mb-3 border border-saffron-200 dark:border-saffron-800">
                  <Layers className="w-3 h-3" aria-hidden="true" />
                  <span>Curriculum</span>
                </div>
                <h2 id="topics-heading" className="font-serif text-3xl sm:text-4xl font-bold text-[var(--foreground)]">
                  Featured Subject Areas
                </h2>
                <p className="mt-2 text-[var(--muted-foreground)]">
                  Deep-dive into structured, sourced IKS disciplines.
                </p>
              </div>
              <Link
                href="/explore"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-saffron-700 dark:text-saffron-400 hover:underline shrink-0"
              >
                View all subjects
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredTopics.map((topic) => {
                const isHealth = topic.disclaimerType !== "none";
                return (
                  <Link
                    key={topic.id}
                    href={`/topics/${topic.slug}`}
                    className="group card card-interactive overflow-hidden flex flex-col"
                  >
                    {/* Cover image */}
                    <div className="relative h-44 bg-[var(--muted)] overflow-hidden">
                      {topic.coverImageUrl && (
                        <Image
                          src={topic.coverImageUrl}
                          alt={topic.title}
                          fill
                          loading="lazy"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

                      {isHealth && (
                        <span className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500 text-white shadow-sm">
                          <AlertTriangle className="w-3 h-3" aria-hidden="true" />
                          {topic.disclaimerType === "medical" ? "Medical Notice" : "Practice Notice"}
                        </span>
                      )}

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-saffron-300 mb-1 opacity-90">
                          {topic.category.name}
                        </p>
                        <h3 className="font-serif text-lg font-bold group-hover:text-saffron-300 transition-colors leading-snug">
                          {topic.title}
                        </h3>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-5 flex-1 flex flex-col">
                      <p className="text-sm text-[var(--muted-foreground)] line-clamp-2 flex-1">{topic.summary}</p>
                      <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--muted-foreground)]">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5 text-saffron-600" aria-hidden="true" />
                          {topic._count.lessons} Lessons
                        </span>
                        <span className="flex items-center gap-1">
                          <VideoIcon className="w-3.5 h-3.5 text-indigo-500" aria-hidden="true" />
                          {topic._count.videos} Videos
                        </span>
                        <span className="text-saffron-600 group-hover:translate-x-1 transition-transform">
                          <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/explore"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-saffron-700 dark:text-saffron-400 hover:underline"
              >
                View all subjects <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── 4. POPULAR + RECENT LESSONS ───────────────────────────────── */}
      {(popularLessons.length > 0 || recentLessons.length > 0) && (
        <section aria-labelledby="lessons-heading" className="section-padding border-b border-[var(--border)] bg-[var(--background-secondary)]">
          <div className="container-page">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3 border border-indigo-200 dark:border-indigo-800">
                <BookOpen className="w-3 h-3" aria-hidden="true" />
                <span>Curriculum</span>
              </div>
              <h2 id="lessons-heading" className="font-serif text-3xl sm:text-4xl font-bold text-[var(--foreground)]">
                Popular Lessons
              </h2>
              <p className="mt-2 text-[var(--muted-foreground)]">
                Start with the most studied lessons in the curriculum.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {popularLessons.map((lesson) => {
                const claimType = (lesson.sources[0]?.claimType as ClaimType) || "scholarly";
                return (
                  <Link
                    key={lesson.id}
                    href={`/lessons/${lesson.slug}`}
                    className="group card card-interactive flex flex-col p-5 space-y-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-saffron-700 dark:text-saffron-400">
                        {lesson.topic.title}
                      </span>
                      <EvidenceBadge claimType={claimType} />
                    </div>
                    <h3 className="font-serif text-base font-bold text-[var(--foreground)] group-hover:text-saffron-600 dark:group-hover:text-saffron-400 transition-colors leading-snug">
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-[var(--muted-foreground)] line-clamp-2 leading-relaxed flex-1">
                      {lesson.intro}
                    </p>
                    <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)] pt-3 border-t border-[var(--border)]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                        {lesson.estMinutes} min read
                      </span>
                      <span className="capitalize px-2 py-0.5 rounded-md bg-[var(--muted)] text-[10px] font-semibold">
                        {lesson.difficulty}
                      </span>
                      <span className="text-saffron-600 group-hover:translate-x-1 transition-transform">
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Recently added */}
            {recentLessons.length > 0 && (
              <div className="mt-10">
                <h3 className="font-serif text-xl font-bold text-[var(--foreground)] mb-5">
                  Recently Added
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {recentLessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={`/lessons/${lesson.slug}`}
                      className="group flex items-center gap-4 p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:border-saffron-400 shadow-card hover:shadow-card-hover transition-all"
                    >
                      <div className="w-10 h-10 rounded-xl bg-saffron-50 dark:bg-saffron-950/40 flex items-center justify-center shrink-0">
                        <BookOpen className="w-4.5 h-4.5 text-saffron-600" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-bold text-saffron-700 dark:text-saffron-400 uppercase tracking-wide mb-0.5">
                          {lesson.topic.title}
                        </p>
                        <h4 className="font-semibold text-sm text-[var(--foreground)] group-hover:text-saffron-600 transition-colors line-clamp-1">
                          {lesson.title}
                        </h4>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[var(--muted-foreground)] group-hover:text-saffron-600 group-hover:translate-x-1 transition-all shrink-0" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── 5. FEATURED VIDEOS ────────────────────────────────────────── */}
      {featuredVideos.length > 0 && (
        <section aria-labelledby="videos-heading" className="section-padding border-b border-[var(--border)]">
          <div className="container-page">
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3 border border-indigo-200 dark:border-indigo-800">
                  <VideoIcon className="w-3 h-3" aria-hidden="true" />
                  <span>Videos</span>
                </div>
                <h2 id="videos-heading" className="font-serif text-3xl sm:text-4xl font-bold text-[var(--foreground)]">
                  Curated Video Lectures
                </h2>
                <p className="mt-2 text-[var(--muted-foreground)]">
                  Handpicked expert lectures from verified academic channels.
                </p>
              </div>
              <Link
                href="/videos"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-saffron-700 dark:text-saffron-400 hover:underline shrink-0"
              >
                Browse all videos
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredVideos.map((video) => (
                <a
                  key={video.id}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group card card-interactive overflow-hidden flex flex-col"
                >
                  {/* Thumbnail — lazy loaded, click-to-play facade */}
                  <div className="relative aspect-video bg-[var(--muted)] overflow-hidden">
                    {video.thumbnailUrl && (
                      <Image
                        src={video.thumbnailUrl}
                        alt={video.title}
                        fill
                        loading="lazy"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-stone-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-stone-900 ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <polygon points="5,3 19,12 5,21" />
                        </svg>
                      </div>
                    </div>
                    {video.durationSeconds && (
                      <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-stone-950/80 text-white">
                        {Math.floor(video.durationSeconds / 60)}:{String(video.durationSeconds % 60).padStart(2, "0")}
                      </span>
                    )}
                  </div>

                  <div className="p-4 flex-1 flex flex-col gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-saffron-700 dark:text-saffron-400">
                      {video.topic.title}
                    </p>
                    <h3 className="font-semibold text-sm text-[var(--foreground)] line-clamp-2 group-hover:text-saffron-600 transition-colors leading-snug flex-1">
                      {video.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)] pt-2 border-t border-[var(--border)]">
                      <span className="line-clamp-1">{video.channelName}</span>
                      <span className="flex items-center gap-1 shrink-0">
                        Open on YouTube
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 6. WHY LEARN IKS ──────────────────────────────────────────── */}
      <section aria-labelledby="why-iks-heading" className="section-padding border-b border-[var(--border)] bg-[var(--background-secondary)]">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 id="why-iks-heading" className="font-serif text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4">
              Why Study Indian Knowledge Systems?
            </h2>
            <p className="text-[var(--muted-foreground)] leading-relaxed">
              IKS offers a rigorous, interdisciplinary framework that complements modern education.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              {
                icon: <Award className="w-5 h-5" aria-hidden="true" />,
                color: "text-amber-600",
                bg: "bg-amber-50 dark:bg-amber-950/30",
                title: "Academically Rigorous",
                desc: "Content mapped to NCERT IKS guidelines, UGC frameworks, and AICTE-recommended curricula.",
              },
              {
                icon: <Star className="w-5 h-5" aria-hidden="true" />,
                color: "text-indigo-600",
                bg: "bg-indigo-50 dark:bg-indigo-950/30",
                title: "Interdisciplinary Insight",
                desc: "Connects mathematics, medicine, philosophy, ecology, and linguistics in an integrated systems view.",
              },
              {
                icon: <CheckCircle2 className="w-5 h-5" aria-hidden="true" />,
                color: "text-emerald-600",
                bg: "bg-emerald-50 dark:bg-emerald-950/30",
                title: "Source Transparent",
                desc: "Every claim links to a numbered primary source. Students can verify directly from the reference list.",
              },
              {
                icon: <Users className="w-5 h-5" aria-hidden="true" />,
                color: "text-terracotta-600",
                bg: "bg-orange-50 dark:bg-orange-950/30",
                title: "For All Levels",
                desc: "Beginner-friendly introductions alongside advanced scholarly analysis — suitable for school students to researchers.",
              },
            ].map((item) => (
              <div key={item.title} className="card p-5 space-y-3">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", item.bg, item.color)}>
                  {item.icon}
                </div>
                <h3 className="font-semibold text-sm text-[var(--foreground)]">{item.title}</h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. AI TUTOR PROMO ─────────────────────────────────────────── */}
      <section aria-labelledby="tutor-promo-heading" className="section-padding border-b border-[var(--border)]">
        <div className="container-page">
          <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-indigoInk-900 via-indigoInk-800 to-saffron-900 text-white relative">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-jaali-pattern opacity-20" aria-hidden="true" />

            <div className="relative p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="flex-1 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-saffron-500/20 border border-saffron-400/30 text-saffron-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-saffron-400" aria-hidden="true" />
                  Grounded Knowledge Engine · Zero Speculation
                </div>
                <h2 id="tutor-promo-heading" className="font-serif text-2xl sm:text-3xl font-bold text-balance">
                  Ask Anything About Indian Knowledge Systems
                </h2>
                <p className="text-sm text-white/80 leading-relaxed max-w-md">
                  The BharatGyaan AI Tutor answers only from verified primary texts and peer-reviewed curriculum — no hallucination, no speculation.
                </p>

                {/* Sample question chips */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {[
                    "What is the Pythagorean theorem in Baudhayana?",
                    "Explain Tridosha in Ayurveda.",
                    "Tell me about Nalanda University.",
                    "What did Aryabhata discover?",
                  ].map((q) => (
                    <Link
                      key={q}
                      href={`/tutor?q=${encodeURIComponent(q)}`}
                      className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-xs text-white/90 hover:bg-white/20 transition-colors"
                    >
                      {q}
                    </Link>
                  ))}
                </div>

                <Link
                  href="/tutor"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-saffron-500 hover:bg-saffron-400 text-white shadow-warm transition-colors"
                >
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                  Launch AI Tutor
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>

              {/* Decorative card */}
              <div className="hidden md:block w-64 shrink-0">
                <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/20 p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-saffron-500/30 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-saffron-300" aria-hidden="true" />
                    </div>
                    <span className="text-xs font-semibold text-white/90">IKS Grounded Tutor</span>
                  </div>
                  <div className="rounded-xl bg-white/10 p-3 text-xs text-white/80 leading-relaxed">
                    The concept of mathematical zero was formally defined by Brahmagupta in 628 CE in the <em>Brahmasphutasiddhanta</em>, establishing rules for arithmetic with zero for the first time in recorded history.
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-white/50">
                    <ShieldCheck className="w-3 h-3" aria-hidden="true" />
                    Cited: Brahmasphutasiddhanta (628 CE)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. TRUSTED SOURCES STRIP ──────────────────────────────────── */}
      <section aria-labelledby="sources-strip-heading" className="py-10 border-b border-[var(--border)] bg-[var(--background-secondary)]">
        <div className="container-page text-center">
          <p id="sources-strip-heading" className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-4">
            Sourced from Peer-Reviewed & Primary Texts including
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-[var(--muted-foreground)]">
            {[
              "Baudhayana Sulba Sutras",
              "Aryabhatiya (INSA, 1976)",
              "Brahmasphutasiddhanta",
              "Charaka Samhita",
              "Yoga Sutras of Patanjali",
              "Arthashastra (R. Shamasastry Ed.)",
            ].map((source) => (
              <span key={source} className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" aria-hidden="true" />
                {source}
              </span>
            ))}
          </div>
          <Link
            href="/sources"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-saffron-700 dark:text-saffron-400 hover:underline"
          >
            Browse all {stats.totalSources}+ verified sources
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

    </div>
  );
}
