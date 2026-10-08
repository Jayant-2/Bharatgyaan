import { prisma } from "../db/prisma";
import { ClaimType } from "@/lib/utils";

export interface RetrievedChunk {
  lessonId: string;
  lessonTitle: string;
  lessonSlug: string;
  topicTitle: string;
  topicSlug: string;
  sectionTitle?: string;
  content: string;
  claimType: ClaimType;
  citation: string;
  relevanceScore: number;
}

export async function retrieveGroundedContext(
  query: string,
  scope?: string
): Promise<RetrievedChunk[]> {
  const normalized = query.toLowerCase();
  // Extract search terms (ignore common stopwords)
  const stopWords = new Set([
    "what", "is", "the", "in", "and", "of", "to", "a", "an", "about",
    "tell", "me", "how", "did", "why", "who", "which", "are", "by", "for"
  ]);
  const terms = normalized
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stopWords.has(w));

  // Resolve scope: can be a topic slug OR a lesson slug (from lesson-page panel)
  let topicSlugFilter: string | undefined;
  if (scope && scope !== "global") {
    // First, check if scope is a known lesson slug and resolve to topic slug
    const lessonRecord = await prisma.lesson.findUnique({
      where: { slug: scope },
      select: { topic: { select: { slug: true } } },
    });
    if (lessonRecord) {
      topicSlugFilter = lessonRecord.topic.slug;
    } else {
      // Treat scope as a topic slug directly
      topicSlugFilter = scope;
    }
  }

  // Fetch all published lessons with sources, topics, and key terms
  const lessons = await prisma.lesson.findMany({
    where: {
      status: "published",
      ...(topicSlugFilter
        ? { topic: { slug: topicSlugFilter } }
        : {}),
    },
    include: {
      topic: true,
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
    },
  });

  const chunks: RetrievedChunk[] = [];

  for (const lesson of lessons) {
    let baseScore = 0;
    const lessonTitleLower = lesson.title.toLowerCase();
    const lessonIntroLower = lesson.intro.toLowerCase();
    const topicTitleLower = lesson.topic.title.toLowerCase();

    // Check full query inclusion
    if (lessonTitleLower.includes(normalized) || normalized.includes(lessonTitleLower)) {
      baseScore += 50;
    }
    if (lessonIntroLower.includes(normalized)) {
      baseScore += 30;
    }

    // Score individual terms
    for (const term of terms) {
      if (lessonTitleLower.includes(term)) baseScore += 15;
      if (lessonIntroLower.includes(term)) baseScore += 10;
      if (topicTitleLower.includes(term)) baseScore += 8;
    }

    // Check key terms
    for (const { keyTerm } of lesson.keyTerms) {
      const termLower = keyTerm.term.toLowerCase();
      const meaningLower = keyTerm.meaning.toLowerCase();
      if (normalized.includes(termLower) || terms.some((t) => termLower.includes(t))) {
        baseScore += 25;
      }
      if (terms.some((t) => meaningLower.includes(t))) {
        baseScore += 10;
      }
    }

    // Parse sections from bodyJson
    let sections: Array<{
      type: string;
      title: string;
      claimType: ClaimType;
      content: string;
    }> = [];
    try {
      const parsed = JSON.parse(lesson.bodyJson);
      sections = parsed.sections || [];
    } catch {
      sections = [];
    }

    // Primary citation text
    const defaultCitation =
      lesson.sources[0]?.source
        ? `${lesson.sources[0].source.title} — ${lesson.sources[0].source.authors}${
            lesson.sources[0].locator ? ` (${lesson.sources[0].locator})` : ""
          }`
        : "BharatGyaan Peer-Reviewed IKS Curriculum";

    const defaultClaimType: ClaimType =
      (lesson.sources[0]?.claimType as ClaimType) || "scholarly";

    // If sections exist, score each section
    if (sections.length > 0) {
      for (const sec of sections) {
        let secScore = baseScore;
        const secTitleLower = sec.title.toLowerCase();
        const secContentLower = sec.content.toLowerCase();

        for (const term of terms) {
          if (secTitleLower.includes(term)) secScore += 15;
          if (secContentLower.includes(term)) secScore += 5;
        }

        if (secScore > 0) {
          chunks.push({
            lessonId: lesson.id,
            lessonTitle: lesson.title,
            lessonSlug: lesson.slug,
            topicTitle: lesson.topic.title,
            topicSlug: lesson.topic.slug,
            sectionTitle: sec.title,
            content: sec.content,
            claimType: sec.claimType || defaultClaimType,
            citation: defaultCitation,
            relevanceScore: secScore,
          });
        }
      }
    } else if (baseScore > 0) {
      chunks.push({
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        lessonSlug: lesson.slug,
        topicTitle: lesson.topic.title,
        topicSlug: lesson.topic.slug,
        content: lesson.intro,
        claimType: defaultClaimType,
        citation: defaultCitation,
        relevanceScore: baseScore,
      });
    }
  }

  // Sort descending by relevance score
  chunks.sort((a, b) => b.relevanceScore - a.relevanceScore);

  return chunks.slice(0, 5); // Return top 5 most relevant chunks
}
