import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Semantic CSS-variable driven tokens
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        ring: "var(--ring)",
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        success: {
          DEFAULT: "var(--success)",
          foreground: "var(--success-foreground)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          foreground: "var(--warning-foreground)",
        },
        info: {
          DEFAULT: "var(--info)",
          foreground: "var(--info-foreground)",
        },

        // BharatGyaan brand palette — full scale
        saffron: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
          950: "#451a03",
          DEFAULT: "#D97706",
        },
        terracotta: {
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#F97316",
          600: "#EA580C",
          700: "#C2410C",
          800: "#9A3412",
          900: "#7C2D12",
          DEFAULT: "#C2410C",
        },
        // Deep Indigo — primary brand, headings, nav
        indigoInk: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
          950: "#1e1b4b",
          DEFAULT: "#1F2A5C",
        },
        // Warm off-white — backgrounds
        cream: {
          50: "#FDFAF4",
          100: "#FBF8F3",
          200: "#F5EFE0",
          300: "#ECE0C9",
          400: "#D9C9A8",
          DEFAULT: "#FBF8F3",
        },
        // Evidence-type badge colours
        evidence: {
          historical: "#B45309",
          traditional: "#4338CA",
          scholarly: "#1D4ED8",
          scientific: "#15803D",
          mixed: "#6B7280",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-noto-sans)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-source-serif)", "var(--font-noto-serif)", "Georgia", "serif"],
        devanagari: ["var(--font-noto-sans-devanagari)", "Noto Sans Devanagari", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1.16" }],
        "6xl": ["3.75rem", { lineHeight: "1.1" }],
      },
      spacing: {
        "4.5": "1.125rem",
        "13": "3.25rem",
        "15": "3.75rem",
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        "warm-sm": "0 2px 8px -1px rgba(217, 119, 6, 0.10)",
        "warm": "0 4px 20px -2px rgba(217, 119, 6, 0.14), 0 2px 4px rgba(0,0,0,0.04)",
        "warm-lg": "0 10px 40px -4px rgba(217, 119, 6, 0.18)",
        "card": "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px -2px rgba(0,0,0,0.05)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.08), 0 12px 40px -4px rgba(0,0,0,0.10)",
        "elevated": "0 10px 30px -4px rgba(15, 23, 42, 0.10), 0 4px 6px -2px rgba(15, 23, 42, 0.05)",
      },
      maxWidth: {
        "prose-lg": "72ch",
        "content": "80ch",
      },
      animation: {
        "fade-in": "fadeIn 200ms ease-out",
        "slide-up": "slideUp 200ms ease-out",
        "slide-down": "slideDown 200ms ease-out",
        "spin-slow": "spin 8s linear infinite",
        "pulse-gentle": "pulse 3s cubic-bezier(0.4,0,0.6,1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      transitionDuration: {
        "150": "150ms",
        "200": "200ms",
        "250": "250ms",
      },
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
