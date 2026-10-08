import React from "react";
import Link from "next/link";
import { BookOpen, ShieldCheck, HeartHandshake, Sparkles, ExternalLink } from "lucide-react";

const footerSections = [
  {
    title: "Knowledge Areas",
    links: [
      { label: "Indian Mathematics", href: "/topics/mathematics" },
      { label: "Indian Astronomy", href: "/topics/astronomy" },
      { label: "Ayurveda Sciences", href: "/topics/ayurveda" },
      { label: "Yoga & Mind Science", href: "/topics/yoga" },
      { label: "Architecture & Vastu", href: "/topics/architecture" },
      { label: "View All 12 Subjects →", href: "/explore", highlight: true },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "Introduction Series", href: "/introduction" },
      { label: "IKS AI Tutor", href: "/tutor", badge: "Grounded" },
      { label: "Video Library", href: "/videos" },
      { label: "Source Registry", href: "/sources" },
      { label: "Student Dashboard", href: "/dashboard" },
      { label: "Search", href: "/search" },
    ],
  },
  {
    title: "Standards & Legal",
    links: [
      { label: "About the Platform", href: "/about" },
      { label: "Editorial Policy", href: "/about#editorial-policy" },
      { label: "Medical & Yoga Notice", href: "/legal/disclaimer" },
      { label: "Privacy Policy (DPDP)", href: "/legal/privacy" },
      { label: "Terms of Learning", href: "/legal/terms" },
      { label: "Admin CMS", href: "/admin", subtle: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)]">

      {/* Statutory disclaimer banner */}
      <div className="bg-amber-500/8 border-b border-amber-400/20">
        <div className="container-page py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-start gap-2 text-amber-900 dark:text-amber-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                <strong>Educational Disclaimer:</strong> All content on BharatGyaan is for historical, philosophical, and educational purposes only. Ayurvedic and yogic content is not medical diagnosis, treatment, or prescription. Always consult a qualified healthcare professional.
              </span>
            </div>
            <Link
              href="/legal/disclaimer"
              className="text-amber-700 dark:text-amber-400 font-semibold underline shrink-0 hover:text-amber-900 dark:hover:text-amber-300 inline-flex items-center gap-1 text-xs"
            >
              Full Disclaimer
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="container-page py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">

          {/* Brand column */}
          <div className="lg:col-span-2 space-y-5">
            <Link
              href="/"
              className="flex items-center gap-3 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] rounded-xl"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-saffron-600 to-terracotta-600 flex items-center justify-center text-white shadow-warm-sm">
                <BookOpen className="w-4 h-4" aria-hidden="true" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-[var(--foreground)]">
                BharatGyaan
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-[var(--muted-foreground)] max-w-sm">
              An AI-powered Indian Knowledge Systems (IKS) learning platform. Dedicated to structured, source-verified pedagogy bridging classical Indic wisdom with contemporary scientific inquiry.
            </p>

            {/* AI Tutor promo chip */}
            <Link
              href="/tutor"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-saffron-50 dark:bg-saffron-950/40 border border-saffron-200 dark:border-saffron-800 text-saffron-800 dark:text-saffron-300 hover:bg-saffron-100 dark:hover:bg-saffron-950/60 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-saffron-600" aria-hidden="true" />
              <span>Try the Grounded AI Tutor</span>
            </Link>

            <div className="flex items-center gap-2 text-xs font-medium text-[var(--muted-foreground)]">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
              <span>100% Grounded AI · Verified Primary Sources</span>
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5 text-sm" role="list">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={
                        link.highlight
                          ? "text-saffron-600 dark:text-saffron-400 font-medium hover:underline inline-flex items-center gap-1"
                          : link.subtle
                          ? "text-[var(--muted-foreground)] hover:text-[var(--foreground)] text-xs transition-colors"
                          : "text-[var(--muted-foreground)] hover:text-saffron-600 dark:hover:text-saffron-400 transition-colors flex items-center gap-1.5"
                      }
                    >
                      {link.label}
                      {"badge" in link && link.badge && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-saffron-100 dark:bg-saffron-950/60 text-saffron-800 dark:text-saffron-300 rounded">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--muted-foreground)]">
          <div className="flex flex-col gap-1.5 text-center sm:text-left">
            <p>
              © {new Date().getFullYear()} BharatGyaan. Built for students, scholars, and lifelong learners of IKS.
            </p>
            <p className="font-medium">
              Designed & Developed by Jayanta Maharana
            </p>
          </div>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="inline-flex items-center gap-1">
              <HeartHandshake className="w-3.5 h-3.5 text-terracotta-500" aria-hidden="true" />
              Evidence-based Pedagogy
            </span>
            <span aria-hidden="true">·</span>
            <span>India DPDP Act 2023 Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
