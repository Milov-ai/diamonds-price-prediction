import type { DashboardData } from "../types/model";
import { GlassCard } from "./ui/GlassCard";
import { AnimatedCounter } from "./ui/AnimatedCounter";

interface Props {
  data: DashboardData;
}

export function DatasetInfo({ data }: Props) {
  const info = data.dataset_info;

  const stats = [
    { label: "Registros Originales", value: info.total_original, color: "bg-violet-500" },
    { label: "Registros Limpios", value: info.total_limpio, color: "bg-emerald-500" },
    { label: "Entrenamiento (80%)", value: info.registros_train, color: "bg-cyan-500" },
    { label: "Prueba (20%)", value: info.registros_test, color: "bg-amber-500" },
  ];

  return (
    <section>
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Sobre el Dataset</h2>
        <p className="mt-2 text-sm text-text-secondary">
          Dataset <span className="font-semibold text-text-primary">'diamonds'</span> de Seaborn · Metodología CRISP-DM
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <GlassCard key={stat.label} className="text-center">
            <div className={`mx-auto mb-4 h-1 w-10 rounded-full ${stat.color}`} />
            <AnimatedCounter
              value={stat.value}
              className="text-3xl font-extrabold text-accent"
              duration={1.5}
            />
            <p className="mt-2 text-xs text-text-secondary">{stat.label}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
