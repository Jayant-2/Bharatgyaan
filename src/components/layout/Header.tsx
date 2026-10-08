"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ChevronDown,
  Sparkles,
  Search,
  Menu,
  X,
  Compass,
  Video,
  Database,
  ArrowRight,
  Atom,
  HeartPulse,
  Palette,
  Sun,
  Moon,
  Monitor,
  GraduationCap,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

const megaGroups = [
  {
    title: "Knowledge & Science",
    icon: Atom,
    colorClass: "text-amber-600 dark:text-amber-400",
    bgClass: "bg-amber-50 dark:bg-amber-950/40",
    topics: [
      { name: "Indian Mathematics", slug: "mathematics", desc: "Zero, decimal system, Sulba geometry" },
      { name: "Indian Astronomy", slug: "astronomy", desc: "Aryabhata models, yantras, celestial cycles" },
      { name: "Indian Architecture", slug: "architecture", desc: "Vastu Shastra, sacred acoustics, temples" },
      { name: "Indian Agriculture", slug: "agriculture", desc: "Krishi Shastra, soil wisdom, monsoon cycles" },
      { name: "Science & Technology", slug: "science-technology", desc: "Wootz steel, metallurgy, hydrology" },
    ],
  },
  {
    title: "Health & Lifestyle",
    icon: HeartPulse,
    colorClass: "text-emerald-600 dark:text-emerald-400",
    bgClass: "bg-emerald-50 dark:bg-emerald-950/40",
    topics: [
      { name: "Ayurveda", slug: "ayurveda", desc: "Tridosha balance, preventative health, herbal systems" },
      { name: "Yoga & Mind-Body", slug: "yoga", desc: "Ashtanga yoga, Patanjali sutras, cognitive science" },
      { name: "Ancient Lifestyle", slug: "ancient-lifestyle", desc: "Dinacharya daily cycles, seasonal living" },
      { name: "Food & Recipes", slug: "food-recipes", desc: "Ahara Vijnana, 6 tastes, traditional nutrition" },
    ],
  },
  {
    title: "Philosophy & Education",
    icon: Compass,
    colorClass: "text-indigo-600 dark:text-indigo-400",
    bgClass: "bg-indigo-50 dark:bg-indigo-950/40",
    topics: [
      { name: "Indian Philosophy", slug: "philosophy", desc: "The 6 Darshanas, Nyaya epistemology, Vedanta" },
      { name: "Ancient Education", slug: "education", desc: "Nalanda, Takshashila, Gurukula pedagogy" },
      { name: "Indian Literature", slug: "literature", desc: "Classical Sanskrit, Epics, Sangam traditions" },
    ],
  },
  {
    title: "Culture & Arts",
    icon: Palette,
    colorClass: "text-orange-600 dark:text-orange-400",
    bgClass: "bg-orange-50 dark:bg-orange-950/40",
    topics: [
      { name: "Art & Aesthetics", slug: "art-culture", desc: "Natya Shastra, Rasa aesthetics, sculpture" },
      { name: "Introduction to IKS", slug: "introduction", isDirect: true, desc: "Foundational 17-lesson structured series" },
    ],
  },
];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "Videos", href: "/videos" },
  { label: "Sources", href: "/sources" },
];

export function Header() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const learnButtonRef = useRef<HTMLButtonElement>(null);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Detect scroll for header shadow
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close on route change
  useEffect(() => {
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) {
        setMegaMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Escape key
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (megaMenuOpen) {
          setMegaMenuOpen(false);
          learnButtonRef.current?.focus();
        }
        if (mobileMenuOpen) setMobileMenuOpen(false);
      }
    }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [megaMenuOpen, mobileMenuOpen]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const isLearnActive = pathname?.startsWith("/topics") || pathname?.startsWith("/lessons") || pathname?.startsWith("/introduction");

  const themeCycle = useCallback(() => {
    const order: ReturnType<typeof theme>[] = ["light", "dark", "system"];
    const next = order[(order.indexOf(theme) + 1) % order.length];
    setTheme(next);
  }, [theme, setTheme]);

  const ThemeIcon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b glass-nav transition-all duration-200",
        scrolled
          ? "border-[var(--border)] shadow-sm"
          : "border-transparent"
      )}
    >
      <div className="container-page">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ─────────────────────────────── */}
          <Link
            href="/"
            className="flex items-center gap-3 group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] rounded-xl"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-saffron-600 to-terracotta-600 flex items-center justify-center text-white shadow-warm-sm group-hover:scale-105 transition-transform duration-200 shrink-0">
              <BookOpen className="w-4.5 h-4.5" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-serif text-lg font-bold tracking-tight text-[var(--foreground)]">
                BharatGyaan
                <span className="ml-1.5 text-[10px] font-sans font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-saffron-100 dark:bg-saffron-950/60 text-saffron-800 dark:text-saffron-300 border border-saffron-200 dark:border-saffron-800 align-middle">
                  IKS
                </span>
              </span>
              <span className="text-[11px] text-[var(--muted-foreground)] font-medium hidden sm:block mt-0.5">
                Indian Knowledge Systems
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ───────────────────────── */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {/* Home */}
            <Link
              href="/"
              aria-current={pathname === "/" ? "page" : undefined}
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname === "/"
                  ? "text-saffron-700 dark:text-saffron-400 bg-saffron-50 dark:bg-saffron-950/40"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
              )}
            >
              Home
            </Link>

            {/* Learn mega-menu */}
            <div className="relative" ref={megaMenuRef}>
              <button
                ref={learnButtonRef}
                type="button"
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                onMouseEnter={() => setMegaMenuOpen(true)}
                aria-expanded={megaMenuOpen}
                aria-haspopup="true"
                aria-controls="mega-menu"
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  megaMenuOpen || isLearnActive
                    ? "text-saffron-700 dark:text-saffron-400 bg-saffron-50 dark:bg-saffron-950/40"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
                )}
              >
                <span>Learn</span>
                <ChevronDown
                  className={cn("w-3.5 h-3.5 transition-transform duration-200", megaMenuOpen && "rotate-180")}
                  aria-hidden="true"
                />
              </button>

              {/* Mega Menu */}
              {megaMenuOpen && (
                <div
                  id="mega-menu"
                  role="region"
                  aria-label="Subject areas"
                  onMouseLeave={() => setMegaMenuOpen(false)}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[860px] rounded-2xl bg-[var(--card)] shadow-elevated border border-[var(--border)] p-6 z-50 animate-fade-in"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-[var(--border)]">
                    <div>
                      <p className="text-sm font-semibold text-[var(--foreground)]">Explore 12 IKS Disciplines</p>
                      <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Peer-reviewed, source-verified curriculum.</p>
                    </div>
                    <Link
                      href="/introduction"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-saffron-700 dark:text-saffron-400 hover:underline"
                    >
                      <span>Start with Introduction to IKS</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    {megaGroups.map((group) => {
                      const Icon = group.icon;
                      return (
                        <div key={group.title} className="space-y-2">
                          <div className="flex items-center gap-2 mb-3">
                            <div className={cn("p-1.5 rounded-md", group.bgClass)}>
                              <Icon className={cn("w-3.5 h-3.5", group.colorClass)} aria-hidden="true" />
                            </div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                              {group.title}
                            </span>
                          </div>
                          <ul className="space-y-0.5" role="list">
                            {group.topics.map((t) => (
                              <li key={t.slug}>
                                <Link
                                  href={t.isDirect ? `/${t.slug}` : `/topics/${t.slug}`}
                                  className="group/item flex flex-col px-2 py-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
                                  onClick={() => setMegaMenuOpen(false)}
                                >
                                  <span className="text-sm font-medium text-[var(--foreground)] group-hover/item:text-saffron-600 dark:group-hover/item:text-saffron-400 flex items-center justify-between">
                                    {t.name}
                                    <ArrowRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 -translate-x-1 group-hover/item:translate-x-0 transition-all text-saffron-500" aria-hidden="true" />
                                  </span>
                                  <span className="text-[11px] text-[var(--muted-foreground)] line-clamp-1 mt-0.5">{t.desc}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Standard nav links */}
            {NAV_LINKS.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-saffron-700 dark:text-saffron-400 bg-saffron-50 dark:bg-saffron-950/40"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* AI Tutor */}
            <Link
              href="/tutor"
              aria-current={pathname === "/tutor" ? "page" : undefined}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors",
                pathname === "/tutor"
                  ? "text-saffron-700 dark:text-saffron-400 bg-saffron-100/60 dark:bg-saffron-950/60"
                  : "text-saffron-800 dark:text-saffron-300 hover:bg-saffron-50 dark:hover:bg-saffron-950/40"
              )}
            >
              <Sparkles className="w-3.5 h-3.5 text-saffron-600" aria-hidden="true" />
              <span>AI Tutor</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-saffron-100 dark:bg-saffron-900 text-saffron-900 dark:text-saffron-200 rounded-full leading-none">
                Live
              </span>
            </Link>
          </nav>

          {/* ── Right Actions ─────────────────────── */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <Link
              href="/search"
              aria-label="Search IKS content"
              className="p-2 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            >
              <Search className="w-5 h-5" aria-hidden="true" />
            </Link>

            {/* Theme toggle */}
            <button
              type="button"
              onClick={themeCycle}
              aria-label={`Current theme: ${theme}. Click to change.`}
              title={`Theme: ${theme}`}
              className="p-2 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            >
              <ThemeIcon className="w-5 h-5" aria-hidden="true" />
            </button>

            {/* Dashboard CTA */}
            <Link
              href="/dashboard"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-saffron-600 to-terracotta-600 hover:from-saffron-700 hover:to-terracotta-700 shadow-warm-sm hover:shadow-warm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500 focus-visible:ring-offset-2"
            >
              <GraduationCap className="w-4 h-4" aria-hidden="true" />
              <span>Dashboard</span>
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="lg:hidden p-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ─────────────────────────────── */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-[var(--background)] border-t border-[var(--border)] overflow-y-auto"
          role="dialog"
          aria-label="Navigation menu"
          aria-modal="true"
        >
          <nav className="px-4 py-6 space-y-1" aria-label="Mobile navigation">
            <Link
              href="/"
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium transition-colors",
                pathname === "/"
                  ? "text-saffron-700 dark:text-saffron-400 bg-saffron-50 dark:bg-saffron-950/40"
                  : "text-[var(--foreground)] hover:bg-[var(--muted)]"
              )}
            >
              Home
            </Link>

            {/* Subjects grouped */}
            <div className="pt-2">
              <p className="px-3 text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-2">
                Learn IKS
              </p>
              {megaGroups.map((group) => {
                const Icon = group.icon;
                return (
                  <div key={group.title} className="mb-4">
                    <div className={cn("flex items-center gap-2 px-3 py-2 mb-1")}>
                      <div className={cn("p-1 rounded-md", group.bgClass)}>
                        <Icon className={cn("w-3.5 h-3.5", group.colorClass)} aria-hidden="true" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">{group.title}</span>
                    </div>
                    {group.topics.map((t) => (
                      <Link
                        key={t.slug}
                        href={t.isDirect ? `/${t.slug}` : `/topics/${t.slug}`}
                        className="block pl-9 pr-3 py-2 text-sm font-medium text-[var(--foreground)] hover:text-saffron-600 dark:hover:text-saffron-400 hover:bg-[var(--muted)] rounded-lg transition-colors"
                      >
                        {t.name}
                      </Link>
                    ))}
                  </div>
                );
              })}
            </div>

            <div className="pt-2 space-y-1">
              <Link href="/explore" className="flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors">
                <Compass className="w-5 h-5 text-[var(--muted-foreground)]" aria-hidden="true" />
                Explore Topics
              </Link>
              <Link href="/videos" className="flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors">
                <Video className="w-5 h-5 text-[var(--muted-foreground)]" aria-hidden="true" />
                Curated Videos
              </Link>
              <Link href="/sources" className="flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors">
                <Database className="w-5 h-5 text-[var(--muted-foreground)]" aria-hidden="true" />
                Sources Registry
              </Link>
              <Link
                href="/tutor"
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-base font-semibold text-saffron-700 dark:text-saffron-400 bg-saffron-50 dark:bg-saffron-950/40 transition-colors"
              >
                <Sparkles className="w-5 h-5 text-saffron-600" aria-hidden="true" />
                AI Grounded Tutor
              </Link>
            </div>

            {/* Bottom actions */}
            <div className="pt-4 space-y-3 border-t border-[var(--border)]">
              <div className="flex items-center justify-between px-3">
                <span className="text-sm font-medium text-[var(--muted-foreground)]">Theme</span>
                <div className="flex gap-1">
                  {(["light", "dark", "system"] as const).map((t) => {
                    const Icon = t === "light" ? Sun : t === "dark" ? Moon : Monitor;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTheme(t)}
                        aria-label={`Set theme to ${t}`}
                        className={cn(
                          "p-2 rounded-lg text-sm transition-colors",
                          theme === t
                            ? "bg-[var(--accent-subtle)] text-saffron-700 dark:text-saffron-300"
                            : "text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
                        )}
                      >
                        <Icon className="w-4 h-4" aria-hidden="true" />
                      </button>
                    );
                  })}
                </div>
              </div>
              <Link
                href="/dashboard"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-saffron-600 to-terracotta-600 hover:from-saffron-700 hover:to-terracotta-700 shadow-warm-sm transition-all"
              >
                <GraduationCap className="w-5 h-5" aria-hidden="true" />
                Student Dashboard
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
