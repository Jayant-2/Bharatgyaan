import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4, Noto_Sans, Noto_Serif } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

// ── Fonts ─────────────────────────────────────────────────────────────────
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
});

const sourceSerif4 = Source_Serif_4({
  subsets: ["latin", "latin-ext"],
  variable: "--font-source-serif",
  display: "swap",
  preload: true,
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const notoSans = Noto_Sans({
  subsets: ["latin", "devanagari"],
  variable: "--font-noto-sans",
  display: "swap",
  preload: false,
  weight: ["400", "500", "600", "700"],
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  display: "swap",
  preload: false,
  weight: ["400", "700"],
});

// ── Metadata ──────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://bharatgyaan.in"),
  title: {
    default: "BharatGyaan — AI-Powered Indian Knowledge Systems Learning Platform",
    template: "%s | BharatGyaan IKS",
  },
  description:
    "A structured, trustworthy, student-first platform for exploring Indian Knowledge Systems (IKS) — verified primary sources, curated video lectures, Sanskrit key terms, and a grounded AI tutor.",
  keywords: [
    "Indian Knowledge Systems",
    "IKS",
    "Ayurveda",
    "Yoga Sutras",
    "Indian Mathematics",
    "Sulba Sutras",
    "Aryabhata",
    "Indian Astronomy",
    "Ancient Indian Education",
    "Nalanda University",
    "Vedic Mathematics",
    "Grounded AI Tutor",
    "BharatGyaan",
  ],
  authors: [{ name: "BharatGyaan Academic Initiative" }],
  creator: "BharatGyaan",
  publisher: "BharatGyaan",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "BharatGyaan",
    title: "BharatGyaan — Indian Knowledge Systems Learning Platform",
    description:
      "Explore Indian Mathematics, Astronomy, Ayurveda, Yoga, Philosophy and more — structured lessons verified with primary sources and grounded AI tutoring.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BharatGyaan — Indian Knowledge Systems",
    description: "Structured IKS learning platform with primary source citations and grounded AI tutoring.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF8F3" },
    { media: "(prefers-color-scheme: dark)", color: "#0F1117" },
  ],
};

// ── Root Layout ────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sourceSerif4.variable} ${notoSans.variable} ${notoSerif.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col antialiased" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
        <ThemeProvider>
          {/* Skip to main content — WCAG 2.1 AA */}
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
