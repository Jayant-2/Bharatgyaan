import React from "react";
import { prisma } from "@/server/db/prisma";
import Image from "next/image";
import { Video as VideoIcon, ExternalLink, Play, Clock, Sparkles } from "lucide-react";
import { VideoPlayerList } from "./VideoPlayerList";

export const revalidate = 60;

export default async function VideosPage() {
  const videos = await prisma.video.findMany({
    where: { status: "active" },
    orderBy: { sortOrder: "asc" },
    include: {
      topic: {
        select: { title: true, slug: true },
      },
      subtopic: {
        select: { title: true },
      },
    },
  });

  return (
    <div className="py-12 sm:py-16 bg-[#FFFDF9] dark:bg-[#0B0F19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-100 dark:bg-saffron-950/60 text-saffron-800 dark:text-saffron-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <VideoIcon className="w-3.5 h-3.5" />
            <span>Curated Lectures</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-stone-50 tracking-tight">
            IKS Video Resource Library
          </h1>
          <p className="mt-4 text-base sm:text-lg text-stone-600 dark:text-stone-400">
            High-yield academic lectures from Indian Institutes of Technology (IITs), the Ministry of Education IKS Division, and recognized academic chairs.
          </p>
        </div>

        {/* Video Player Grid */}
        <VideoPlayerList videos={videos} />
      </div>
    </div>
  );
}
