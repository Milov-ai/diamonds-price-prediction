import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { DashboardData } from "../types/model";
import { GlassCard } from "./ui/GlassCard";

interface Props {
  data: DashboardData;
}

const FEATURE_LABELS: Record<string, string> = {
  carat: "Quilates",
  cut: "Corte",
  color: "Color",
  clarity: "Claridad",
  depth: "Profundidad %",
  table: "Mesa %",
  x: "Longitud (x)",
  y: "Ancho (y)",
  z: "Profundidad (z)",
};

export function FeatureImportance({ data }: Props) {
  const chartData = Object.entries(data.importancia_features)
    .map(([feature, importance]) => ({
      feature: FEATURE_LABELS[feature] || feature,
      importance: importance,
    }))
    .sort((a, b) => a.importance - b.importance);

  return (
    <GlassCard glow>
      <h3 className="mb-1 text-lg font-bold text-text-primary">Importancia de Variables</h3>
      <p className="mb-5 text-xs text-text-muted">Random Forest feature importance</p>
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="feature" tick={{ fill: "#475569", fontSize: 12, fontWeight: 500 }} width={90} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
            labelStyle={{ color: "#0f172a", fontWeight: 700 }}
            formatter={(value) => [Number(value).toFixed(4), "Importancia"]}
          />
          <Bar dataKey="importance" fill="url(#featureGradient)" radius={[0, 8, 8, 0]} barSize={24} />
          <defs>
            <linearGradient id="featureGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}
