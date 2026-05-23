import type { DashboardData } from "../types/model";
import { GlassCard } from "./ui/GlassCard";
import { AnimatedCounter } from "./ui/AnimatedCounter";

interface Props {
  data: DashboardData;
}

export function MetricsSection({ data }: Props) {
  const mejor = data.mejor_modelo;
  const metricas = data.metricas[mejor];
  const criterios = data.criterios_exito;

  const cards = [
    {
      title: "R² Score",
      value: metricas.R2,
      decimals: 4,
      prefix: "",
      subtitle: `Umbral: ≥ ${criterios.R2_umbral}`,
      pass: metricas.R2 >= criterios.R2_umbral,
      gradient: "from-violet-500 to-purple-600",
      bg: "bg-violet-50",
    },
    {
      title: "MAE",
      value: metricas.MAE,
      decimals: 2,
      prefix: "$",
      subtitle: `Umbral: < $${criterios.MAE_umbral}`,
      pass: metricas.MAE < criterios.MAE_umbral,
      gradient: "from-cyan-500 to-blue-600",
      bg: "bg-cyan-50",
    },
    {
      title: "RMSE",
      value: metricas.RMSE,
      decimals: 2,
      prefix: "$",
      subtitle: "Lo más bajo posible",
      pass: true,
      gradient: "from-emerald-500 to-green-600",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <section>
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Rendimiento del Modelo</h2>
        <p className="mt-2 text-sm text-text-secondary">
          Mejor modelo: <span className="font-bold text-accent">{mejor}</span>
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        {cards.map((card) => (
          <GlassCard key={card.title} glow>
            <div className="mb-5 flex items-center justify-between">
              <div className={`rounded-lg ${card.bg} px-3 py-1`}>
                <span className={`bg-gradient-to-r ${card.gradient} bg-clip-text text-xs font-bold text-transparent`}>{card.title}</span>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${card.pass ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                {card.pass ? "✓ Cumple" : "✗ No cumple"}
              </span>
            </div>
            <AnimatedCounter
              value={card.value}
              prefix={card.prefix}
              decimals={card.decimals}
              className="text-4xl font-extrabold tracking-tight text-text-primary"
            />
            <p className="mt-3 text-xs text-text-muted">{card.subtitle}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
