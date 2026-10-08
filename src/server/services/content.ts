import { prisma } from "../db/prisma";

export async function getCategoryTree() {
  return await prisma.contentCategory.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    include: {
      topics: {
        where: { status: "published" },
        orderBy: { sortOrder: "asc" },
        include: {
          _count: {
            select: { lessons: true, videos: true },
          },
        },
      },
    },
  });
}

export async function getPlatformStats() {
  const [totalLessons, totalTopics, totalVideos, totalSources] = await Promise.all([
    prisma.lesson.count({ where: { status: "published" } }),
    prisma.topic.count({ where: { status: "published" } }),
    prisma.video.count({ where: { status: "active" } }),
    prisma.source.count({ where: { status: "active" } }),
  ]);

  return {
    totalLessons,
    totalTopics,
    totalVideos,
    totalSources,
  };
}

export async function getFeaturedTopics(limit = 6) {
  return await prisma.topic.findMany({
    where: { status: "published" },
    orderBy: { sortOrder: "asc" },
    take: limit,
    include: {
      category: true,
      _count: {
        select: { lessons: true, videos: true },
      },
    },
  });
}

export async function getPopularLessons(limit = 4) {
  return await prisma.lesson.findMany({
    where: { status: "published" },
    orderBy: { sortOrder: "asc" },
    take: limit,
    include: {
      topic: {
        select: { title: true, slug: true, disclaimerType: true },
      },
      sources: {
        include: { source: true },
        take: 2,
      },
    },
  });
}

export async function getRecentLessons(limit = 4) {
  return await prisma.lesson.findMany({
    where: { status: "published" },
    orderBy: { publishedAt: "desc" },
    take: limit,
    include: {
      topic: {
        select: { title: true, slug: true },
      },
    },
  });
}

export async function getFeaturedVideos(limit = 3) {
  return await prisma.video.findMany({
    where: { status: "active" },
    orderBy: { sortOrder: "asc" },
    take: limit,
    include: {
      topic: {
        select: { title: true, slug: true },
      },
    },
  });
}
