"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { Play, X, ExternalLink, Clock, Video as VideoIcon } from "lucide-react";

export interface RelatedVideoItem {
  id: string;
  youtubeVideoId: string;
  url: string;
  title: string;
  description: string | null;
  thumbnailUrl: string | null;
  channelName: string | null;
  durationSeconds: number | null;
}

interface RelatedVideosProps {
  videos: RelatedVideoItem[];
  heading?: string;
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function RelatedVideos({ videos, heading = "Related Video Lectures" }: RelatedVideosProps) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const activeVideo = videos.find((v) => v.id === activeVideoId) ?? null;

  const openVideo = useCallback((id: string) => {
    setActiveVideoId(id);
  }, []);

  const closeVideo = useCallback(() => {
    const triggerId = activeVideoId;
    setActiveVideoId(null);
    // Return focus to the card that opened the modal
    if (triggerId) {
      setTimeout(() => {
        triggerRefs.current.get(triggerId)?.focus();
      }, 50);
    }
  }, [activeVideoId]);

  // Keyboard: Escape closes modal
  useEffect(() => {
    if (!activeVideo) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeVideo();
    };
    window.addEventListener("keydown", handler);
    // Move focus into modal
    setTimeout(() => closeBtnRef.current?.focus(), 50);
    return () => window.removeEventListener("keydown", handler);
  }, [activeVideo, closeVideo]);

  if (videos.length === 0) {
    return (
      <div className="pt-8 border-t border-stone-200 dark:border-stone-800">
        <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2 mb-4">
          <VideoIcon className="w-5 h-5 text-indigo-500" aria-hidden="true" />
          {heading}
        </h3>
        <div className="rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 p-6 text-center">
          <VideoIcon className="w-8 h-8 text-stone-300 mx-auto mb-2" aria-hidden="true" />
          <p className="text-sm text-stone-500 dark:text-stone-400">
            No video lectures linked to this topic yet.
            <br />
            <span className="text-xs">Check the&nbsp;
              <a href="/videos" className="text-saffron-600 dark:text-saffron-400 underline underline-offset-2">
                full video library
              </a>
              &nbsp;for all curated lectures.
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-8 border-t border-stone-200 dark:border-stone-800 space-y-4">
      <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
        <VideoIcon className="w-5 h-5 text-indigo-500" aria-hidden="true" />
        {heading}
      </h3>

      {/* Video card grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        role="list"
        aria-label="Related video lectures"
      >
        {videos.map((v) => (
          <div
            key={v.id}
            role="listitem"
            className="group flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-indigo-400 shadow-sm hover:shadow-md transition-all"
          >
            {/* Thumbnail / click-to-play facade */}
            <button
              ref={(el) => {
                if (el) triggerRefs.current.set(v.id, el);
                else triggerRefs.current.delete(v.id);
              }}
              type="button"
              onClick={() => openVideo(v.id)}
              aria-label={`Play video: ${v.title}`}
              className="relative aspect-video w-full bg-stone-950 overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              {v.thumbnailUrl && (
                <Image
                  src={v.thumbnailUrl}
                  alt={`Thumbnail for ${v.title}`}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              )}
              {/* Play overlay */}
              <span
                className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/15 transition-colors"
                aria-hidden="true"
              >
                <span className="w-11 h-11 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                </span>
              </span>
              {/* Duration badge */}
              {v.durationSeconds && v.durationSeconds > 0 && (
                <span
                  className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-[11px] font-medium flex items-center gap-1"
                  aria-label={`Duration: ${formatDuration(v.durationSeconds)}`}
                >
                  <Clock className="w-3 h-3" aria-hidden="true" />
                  {formatDuration(v.durationSeconds)}
                </span>
              )}
            </button>

            {/* Card body */}
            <div className="p-3 flex-1 flex flex-col justify-between gap-2">
              <div>
                <button
                  type="button"
                  onClick={() => openVideo(v.id)}
                  className="text-left text-sm font-semibold text-stone-900 dark:text-stone-100 group-hover:text-indigo-600 transition-colors line-clamp-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 rounded"
                >
                  {v.title}
                </button>
                {v.channelName && (
                  <p className="mt-1 text-[11px] text-stone-500 dark:text-stone-400">{v.channelName}</p>
                )}
              </div>
              <a
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 rounded"
                aria-label={`Open "${v.title}" on YouTube (opens in new tab)`}
              >
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
                Open on YouTube
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Modal player */}
      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Video player: ${activeVideo.title}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={(e) => {
            // Close when clicking the backdrop (not the player)
            if (e.target === e.currentTarget) closeVideo();
          }}
        >
          <div className="relative w-full max-w-4xl bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-stone-800">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 border-b border-stone-800 bg-stone-950">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider truncate">
                  {activeVideo.channelName ?? "Academic Lecture"}
                </p>
                <h2 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                  {activeVideo.title}
                </h2>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={closeVideo}
                aria-label="Close video player"
                className="ml-3 shrink-0 p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Privacy-enhanced embed (loaded only after click) */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Footer */}
            <div className="p-3 bg-stone-950 flex items-center justify-between text-xs text-stone-400">
              <span className="truncate">Channel: {activeVideo.channelName ?? "Academic Partner"}</span>
              <a
                href={activeVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 ml-3 inline-flex items-center gap-1 text-indigo-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
              >
                Watch on YouTube
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
