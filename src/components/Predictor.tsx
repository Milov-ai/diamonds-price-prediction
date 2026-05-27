import { useState } from "react";
import { usePredict } from "../hooks/usePredict";
import { Select } from "./ui/Select";
import { NumberInput } from "./ui/NumberInput";
import { GlassCard } from "./ui/GlassCard";
import { AnimatedCounter } from "./ui/AnimatedCounter";
import type { CutCategory, ColorCategory, ClarityCategory } from "../types/model";

const CUT_OPTIONS = [
  { value: "Fair", label: "Fair", sublabel: "Bajo" },
  { value: "Good", label: "Good" },
  { value: "Very Good", label: "Very Good" },
  { value: "Premium", label: "Premium" },
  { value: "Ideal", label: "Ideal", sublabel: "Mejor" },
];

const COLOR_OPTIONS = [
  { value: "J", label: "J", sublabel: "Más color" },
  { value: "I", label: "I" },
  { value: "H", label: "H" },
  { value: "G", label: "G" },
  { value: "F", label: "F" },
  { value: "E", label: "E" },
  { value: "D", label: "D", sublabel: "Sin color" },
];

const CLARITY_OPTIONS = [
  { value: "I1", label: "I1", sublabel: "Menor" },
  { value: "SI2", label: "SI2" },
  { value: "SI1", label: "SI1" },
  { value: "VS2", label: "VS2" },
  { value: "VS1", label: "VS1" },
  { value: "VVS2", label: "VVS2" },
  { value: "VVS1", label: "VVS1" },
  { value: "IF", label: "IF", sublabel: "Perfecta" },
];

export function Predictor() {
  const [carat, setCarat] = useState(1.0);
  const [cut, setCut] = useState<CutCategory>("Ideal");
  const [color, setColor] = useState<ColorCategory>("G");
  const [clarity, setClarity] = useState<ClarityCategory>("VS2");
  const [depth, setDepth] = useState(61.5);
  const [table, setTable] = useState(57.0);
  const [x, setX] = useState(5.7);
  const [y, setY] = useState(5.7);
  const [z, setZ] = useState(3.5);

  const { price, loading, error, predict } = usePredict();
  const [dimensionError, setDimensionError] = useState<string | null>(null);

  function handlePredict() {
    if (x <= 0 || y <= 0 || z <= 0) {
      setDimensionError("Las dimensiones x, y y z deben ser mayores que 0. Un diamante real no puede tener dimensiones nulas.");
      return;
    }
    setDimensionError(null);
    predict({ carat, cut, color, clarity, depth, table, x, y, z });
  }

  return (
    <section className="text-center sm:text-left">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Predecir Precio</h2>
        <p className="mt-2 text-sm text-text-secondary">Ingresa las características del diamante para obtener una estimación en tiempo real</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <GlassCard className="lg:col-span-3" glow>
          <p className="mb-5 text-xs font-bold uppercase tracking-widest text-accent">Características del Diamante</p>

          <div className="relative z-30 mb-5 grid gap-4 sm:grid-cols-3">
            <Select label="Corte" options={CUT_OPTIONS} value={cut} onChange={(v) => setCut(v as CutCategory)} />
            <Select label="Color" options={COLOR_OPTIONS} value={color} onChange={(v) => setColor(v as ColorCategory)} />
            <Select label="Claridad" options={CLARITY_OPTIONS} value={clarity} onChange={(v) => setClarity(v as ClarityCategory)} />
          </div>

          <div className="mb-5 grid gap-4 sm:grid-cols-3">
            <NumberInput label="Quilates" value={carat} onChange={setCarat} step={0.1} min={0.2} max={5.01} unit="ct" />
            <NumberInput label="Profundidad" value={depth} onChange={setDepth} step={0.5} min={43} max={79} unit="%" />
            <NumberInput label="Mesa" value={table} onChange={setTable} step={0.5} min={43} max={95} unit="%" />
          </div>

          <div className="mb-2 grid gap-4 sm:grid-cols-3">
            <NumberInput label="Longitud (x)" value={x} onChange={(v) => { setX(v); setDimensionError(null); }} step={0.1} min={0.1} max={11} unit="mm" />
            <NumberInput label="Ancho (y)" value={y} onChange={(v) => { setY(v); setDimensionError(null); }} step={0.1} min={0.1} max={60} unit="mm" />
            <NumberInput label="Profundidad (z)" value={z} onChange={(v) => { setZ(v); setDimensionError(null); }} step={0.1} min={0.1} max={32} unit="mm" />
          </div>

          {dimensionError && (
            <p className="mb-4 rounded-lg bg-danger/5 px-4 py-2.5 text-xs font-medium text-danger border border-danger/20">
              ⚠ {dimensionError}
            </p>
          )}

          <button
            onClick={handlePredict}
            disabled={loading}
            className="group relative w-full cursor-pointer overflow-hidden rounded-xl bg-accent px-6 py-3.5 font-semibold text-white shadow-md shadow-accent/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-light hover:shadow-lg hover:shadow-accent/30 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Prediciendo...
              </span>
            ) : (
              "Predecir Precio →"
            )}
          </button>
        </GlassCard>

        <GlassCard className="flex flex-col items-center justify-center py-10 text-center lg:col-span-2" glow>
          <div className="relative mb-4">
            <div className="absolute inset-0 animate-pulse rounded-full bg-accent/10 blur-xl" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/10 to-accent-secondary/10">
              <svg className="h-10 w-10 text-accent" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 2L1 8l11 13L23 8l-5-6H6zm2.06 2h7.88l3.34 4H4.72l3.34-4zM12 18.5L3.74 9h16.52L12 18.5z"/>
              </svg>
            </div>
          </div>
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted">
            Precio Estimado
          </p>
          <div className="min-h-[5rem]">
            {price !== null ? (
              <AnimatedCounter
                value={price}
                prefix="$"
                decimals={2}
                className="text-5xl font-extrabold tracking-tight text-accent sm:text-6xl"
              />
            ) : (
              <span className="text-5xl font-extrabold tracking-tight text-border sm:text-6xl">$—</span>
            )}
          </div>
          <p className="mt-4 text-xs text-text-muted">USD · Modelo Random Forest</p>
          {error && (
            <p className="mt-4 rounded-lg bg-danger/5 px-4 py-2 text-xs font-medium text-danger">{error}</p>
          )}
        </GlassCard>
      </div>
    </section>
  );
}
