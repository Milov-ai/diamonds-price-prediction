import { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
  sublabel?: string;
}

interface Props {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export function Select({ label, options, value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-text-muted">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between rounded-xl border bg-bg-card px-4 py-3 text-sm font-medium text-text-primary transition-all duration-200
          ${open
            ? "border-accent ring-2 ring-accent/20 shadow-sm"
            : "border-border hover:border-border-hover"}`}
      >
        <span>{selected?.label || "Seleccionar"}</span>
        <svg
          className={`ml-2 h-4 w-4 text-text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 right-0 z-[100] mt-2 overflow-hidden rounded-xl border border-border bg-bg-card shadow-xl shadow-black/8 animate-in">
          <div className="max-h-60 overflow-y-auto py-1">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors
                  ${opt.value === value
                    ? "bg-accent/5 text-accent font-medium"
                    : "text-text-primary hover:bg-bg-input"}`}
              >
                <span className={`flex h-4 w-4 items-center justify-center rounded-full border ${opt.value === value ? "border-accent bg-accent" : "border-border"}`}>
                  {opt.value === value && (
                    <svg className="h-2.5 w-2.5 text-white" fill="currentColor" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="4" />
                    </svg>
                  )}
                </span>
                <div className="flex items-center gap-2">
                  <span>{opt.label}</span>
                  {opt.sublabel && <span className="text-[11px] text-text-muted">({opt.sublabel})</span>}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
