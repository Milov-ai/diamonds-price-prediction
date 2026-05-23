import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export function GlassCard({ children, className = "", glow = false }: Props) {
  return (
    <div
      className={`rounded-2xl border border-border bg-bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md ${glow ? "hover:shadow-accent/5 hover:border-accent/20" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
