import { useState } from "react";
import type { PredictionInput, PredictionResponse } from "../types/model";

export function usePredict() {
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function predict(input: PredictionInput) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Error en la predicción");
      }

      const data: PredictionResponse = await res.json();
      setPrice(data.price);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      setPrice(null);
    } finally {
      setLoading(false);
    }
  }

  return { price, loading, error, predict };
}
