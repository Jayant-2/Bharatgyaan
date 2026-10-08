"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, ExternalLink, X, Clock } from "lucide-react";

interface VideoItem {
  id: string;
  youtubeVideoId: string;
  url: string;
  title: string;
  description: string | null;
  thumbnailUrl: string | null;
  channelName: string | null;
  durationSeconds: number | null;
  topic: {
    title: string;
    slug: string;
  };
  subtopic: {
    title: string;
  } | null;
}

export function VideoPlayerList({ videos }: { videos: VideoItem[] }) {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  return (
    <div>
      {/* Active Modal / Player View (Section 17 - youtube-nocookie.com) */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-stone-800">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-stone-800 bg-stone-950">
              <div>
                <span className="text-xs uppercase font-semibold text-saffron-400">
                  {activeVideo.topic.title}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                  {activeVideo.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Privacy-Enhanced IFrame Player */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeVideoId}?autoplay=1&rel=0`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Footer Fallback */}
            <div className="p-4 bg-stone-950 flex items-center justify-between text-xs text-stone-400">
              <span>Channel: {activeVideo.channelName || "Academic Partner"}</span>
              <a
                href={activeVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-saffron-400 hover:underline"
              >
                <span>Watch directly on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Video Facade Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((v) => {
          const minutes = v.durationSeconds ? Math.floor(v.durationSeconds / 60) : 0;
          return (
            <div
              key={v.id}
              className="group flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-saffron-400 shadow-sm hover:shadow-lg transition-all"
            >
              {/* Click-to-Play Facade Container */}
              <div
                onClick={() => setActiveVideo(v)}
                className="relative aspect-video w-full bg-stone-950 cursor-pointer overflow-hidden"
              >
                {v.thumbnailUrl && (
                  <Image
                    src={v.thumbnailUrl}
                    alt={v.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/10 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-saffron-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                  </div>
                </div>

                {minutes > 0 && (
                  <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 text-white text-[11px] font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{minutes} mins</span>
                  </span>
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wide">
                    {v.topic.title} {v.subtopic && `• ${v.subtopic.title}`}
                  </span>
                  <h3
                    onClick={() => setActiveVideo(v)}
                    className="font-serif text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-saffron-600 transition-colors line-clamp-2 mt-1 cursor-pointer"
                  >
                    {v.title}
                  </h3>
                  {v.description && (
                    <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                      {v.description}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
                  <span>{v.channelName || "Academic Lecture"}</span>
                  <button
                    type="button"
                    onClick={() => setActiveVideo(v)}
                    className="text-saffron-600 dark:text-saffron-400 font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    <span>Play video</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
