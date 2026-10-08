"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

// ── Button ─────────────────────────────────────────────────────────────────
type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive" | "outline" | "accent";
type ButtonSize = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)] shadow-sm hover:shadow focus-visible:ring-[var(--primary)]",
  accent:
    "bg-gradient-to-r from-saffron-600 to-terracotta-600 text-white hover:from-saffron-700 hover:to-terracotta-700 shadow-sm hover:shadow-warm focus-visible:ring-saffron-500",
  secondary:
    "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:opacity-90 shadow-sm focus-visible:ring-[var(--secondary)]",
  ghost:
    "bg-transparent text-[var(--foreground)] hover:bg-[var(--muted)] focus-visible:ring-[var(--ring)]",
  outline:
    "bg-transparent border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)] focus-visible:ring-[var(--ring)]",
  destructive:
    "bg-[var(--destructive)] text-[var(--destructive-foreground)] hover:opacity-90 shadow-sm focus-visible:ring-[var(--destructive)]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs rounded-lg gap-1.5",
  md: "h-10 px-4 text-sm rounded-xl gap-2",
  lg: "h-12 px-6 text-base rounded-xl gap-2.5",
  icon: "h-10 w-10 rounded-xl",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center font-semibold transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : leftIcon ? (
        <span className="shrink-0">{leftIcon}</span>
      ) : null}
      {children && <span className={loading ? "sr-only" : ""}>{children}</span>}
      {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
}

// ── Badge ──────────────────────────────────────────────────────────────────
type BadgeVariant =
  | "default"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "historical"
  | "traditional"
  | "scholarly"
  | "scientific"
  | "mixed"
  | "difficulty-beginner"
  | "difficulty-intermediate"
  | "difficulty-advanced";

interface BadgeProps {
  variant?: BadgeVariant;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const badgeVariantStyles: Record<BadgeVariant, string> = {
  default: "bg-[var(--muted)] text-[var(--muted-foreground)] border-[var(--border)]",
  accent: "bg-saffron-100 text-saffron-800 border-saffron-200 dark:bg-saffron-950/40 dark:text-saffron-300 dark:border-saffron-800",
  success: "bg-[var(--success-bg)] text-[var(--success)] border-emerald-200 dark:border-emerald-800",
  warning: "bg-[var(--warning-bg)] text-[var(--warning)] border-amber-200 dark:border-amber-800",
  danger: "bg-[var(--destructive-bg)] text-[var(--destructive)] border-red-200 dark:border-red-800",
  info: "bg-[var(--info-bg)] text-[var(--info)] border-blue-200 dark:border-blue-800",
  historical: "badge-historical",
  traditional: "badge-traditional",
  scholarly: "badge-scholarly",
  scientific: "badge-scientific",
  mixed: "badge-mixed",
  "difficulty-beginner": "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
  "difficulty-intermediate": "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800",
  "difficulty-advanced": "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800",
};

export function Badge({ variant = "default", icon, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "badge",
        badgeVariantStyles[variant] || badgeVariantStyles.default,
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}

// ── Skeleton ───────────────────────────────────────────────────────────────
interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ className, style }: SkeletonProps) {
  return <div className={cn("skeleton", className)} style={style} aria-hidden="true" />;
}

export function SkeletonCard() {
  return (
    <div className="card p-5 space-y-3">
      <Skeleton className="h-40 rounded-lg" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <div className="flex gap-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-4"
          style={{ width: i === lines - 1 ? "60%" : "100%" }}
        />
      ))}
    </div>
  );
}

// ── Card ───────────────────────────────────────────────────────────────────
interface CardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
};

export function Card({ children, className, interactive, padding = "md" }: CardProps) {
  return (
    <div
      className={cn(
        "card",
        paddingStyles[padding],
        interactive && "card-interactive cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}

// ── Alert / Callout ────────────────────────────────────────────────────────
type AlertVariant = "info" | "warning" | "success" | "danger" | "medical" | "practice";

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const alertStyles: Record<AlertVariant, string> = {
  info: "bg-[var(--info-bg)] border-[var(--info)] text-[var(--info)] border-l-4 border",
  warning: "bg-[var(--warning-bg)] border-amber-400 text-amber-900 dark:text-amber-200 border-l-4 border",
  success: "bg-[var(--success-bg)] border-emerald-500 text-emerald-900 dark:text-emerald-200 border-l-4 border",
  danger: "bg-[var(--destructive-bg)] border-red-500 text-red-900 dark:text-red-200 border-l-4 border",
  medical:
    "bg-amber-50 dark:bg-amber-950/30 border-amber-400 dark:border-amber-600 text-amber-900 dark:text-amber-200 border-l-4 border",
  practice:
    "bg-blue-50 dark:bg-blue-950/30 border-blue-400 dark:border-blue-600 text-blue-900 dark:text-blue-200 border-l-4 border",
};

export function Alert({ variant = "info", title, icon, children, className }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn("rounded-xl p-4 flex items-start gap-3 text-sm", alertStyles[variant], className)}
    >
      {icon && <span className="shrink-0 mt-0.5">{icon}</span>}
      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold mb-1">{title}</p>}
        <div className="leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

// ── Progress Bar ───────────────────────────────────────────────────────────
interface ProgressBarProps {
  value: number; // 0–100
  className?: string;
  label?: string;
  showLabel?: boolean;
}

export function ProgressBar({ value, className, label, showLabel = false }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={cn("space-y-1", className)}>
      {showLabel && (
        <div className="flex justify-between text-xs text-[var(--muted-foreground)]">
          <span>{label}</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div
        className="progress-bar"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || `${clamped}% complete`}
      >
        <div className="progress-fill" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}

// ── Empty State ────────────────────────────────────────────────────────────
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-16 px-6",
        className
      )}
    >
      {icon && (
        <div className="w-14 h-14 rounded-2xl bg-[var(--muted)] flex items-center justify-center text-[var(--muted-foreground)] mb-4">
          {icon}
        </div>
      )}
      <h3 className="font-semibold text-base text-[var(--foreground)] mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-[var(--muted-foreground)] max-w-sm leading-relaxed mb-6">
          {description}
        </p>
      )}
      {action}
    </div>
  );
}

// ── Tooltip ────────────────────────────────────────────────────────────────
interface TooltipProps {
  content: string;
  children: React.ReactNode;
  className?: string;
}

export function Tooltip({ content, children, className }: TooltipProps) {
  return (
    <span className={cn("group relative inline-flex items-center", className)}>
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs px-2.5 py-1.5 shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150 z-50 text-center leading-snug whitespace-pre-wrap"
      >
        {content}
      </span>
    </span>
  );
}

// ── Breadcrumbs ────────────────────────────────────────────────────────────
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center flex-wrap gap-1 text-xs", className)}>
      <ol className="flex items-center flex-wrap gap-1">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-1">
            {idx > 0 && (
              <span aria-hidden="true" className="text-[var(--muted-foreground)]">
                /
              </span>
            )}
            {item.href && idx < items.length - 1 ? (
              <a
                href={item.href}
                className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors font-medium"
              >
                {item.label}
              </a>
            ) : (
              <span
                className="text-[var(--foreground)] font-semibold"
                aria-current={idx === items.length - 1 ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
