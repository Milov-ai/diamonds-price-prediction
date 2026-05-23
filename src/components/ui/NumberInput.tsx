interface Props {
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  min?: number;
  max?: number;
  unit?: string;
}

export function NumberInput({ label, value, onChange, step = 0.01, min = 0, max = 100, unit }: Props) {
  function adjust(delta: number) {
    const next = Math.round((value + delta) * 100) / 100;
    if (next >= min && next <= max) onChange(next);
  }

  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-text-muted">
        {label}
      </label>
      <div className="flex items-center rounded-xl border border-border bg-bg-card transition-all duration-200 hover:border-border-hover focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20">
        <button
          type="button"
          onClick={() => adjust(-step)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-l-xl text-text-muted transition-colors hover:bg-bg-input hover:text-accent"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
          </svg>
        </button>
        <div className="flex min-w-0 flex-1 items-center justify-center gap-1">
          <input
            type="number"
            value={value}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              if (!isNaN(v) && v >= min && v <= max) onChange(v);
            }}
            step={step}
            min={min}
            max={max}
            className="h-11 w-full min-w-0 bg-transparent text-center text-sm font-medium text-text-primary outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          {unit && <span className="shrink-0 pr-1 text-xs text-text-muted">{unit}</span>}
        </div>
        <button
          type="button"
          onClick={() => adjust(step)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-r-xl text-text-muted transition-colors hover:bg-bg-input hover:text-accent"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );
}
