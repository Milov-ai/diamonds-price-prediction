import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Cell
} from "recharts";
import type { DashboardData } from "../types/model";
import { GlassCard } from "./ui/GlassCard";

interface Props {
  data: DashboardData;
}

const COLORS = ["#8b5cf6", "#f59e0b", "#06b6d4"];

export function ModelComparison({ data }: Props) {
  const chartData = Object.entries(data.metricas).map(([name, m]) => ({
    name: name.replace("Regresion Lineal", "Reg. Lineal").replace("Arbol de Decision", "Árbol Dec."),
    R2: m.R2,
  }));

  return (
    <GlassCard glow>
      <h3 className="mb-1 text-lg font-bold text-text-primary">Comparación de Modelos</h3>
      <p className="mb-5 text-xs text-text-muted">R² Score por modelo</p>
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={chartData} margin={{ top: 10, right: 10, bottom: 5, left: -10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" tick={{ fill: "#475569", fontSize: 12, fontWeight: 500 }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 1]} tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
            labelStyle={{ color: "#0f172a", fontWeight: 700 }}
            formatter={(value, name) => {
              const v = Number(value);
              if (name === "R2") return [v.toFixed(4), "R²"];
              return [`$${v.toFixed(2)}`, String(name)];
            }}
          />
          <ReferenceLine y={data.criterios_exito.R2_umbral} stroke="#dc2626" strokeDasharray="5 5"
            label={{ value: "Umbral 0.85", fill: "#dc2626", fontSize: 11, position: "right" }} />
          <Bar dataKey="R2" radius={[10, 10, 0, 0]} barSize={60}>
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}
