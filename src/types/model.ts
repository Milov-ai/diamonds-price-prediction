export type CutCategory = "Fair" | "Good" | "Very Good" | "Premium" | "Ideal";
export type ColorCategory = "J" | "I" | "H" | "G" | "F" | "E" | "D";
export type ClarityCategory = "I1" | "SI2" | "SI1" | "VS2" | "VS1" | "VVS2" | "VVS1" | "IF";

export interface ModelMetrics {
  R2: number;
  MAE: number;
  MSE: number;
  RMSE: number;
}

export interface DashboardData {
  metricas: Record<string, ModelMetrics>;
  mejor_modelo: string;
  importancia_features: Record<string, number>;
  feature_names: string[];
  ordinal_categories: {
    cut: CutCategory[];
    color: ColorCategory[];
    clarity: ClarityCategory[];
  };
  dataset_info: {
    total_original: number;
    total_limpio: number;
    registros_train: number;
    registros_test: number;
  };
  criterios_exito: {
    R2_umbral: number;
    MAE_umbral: number;
  };
}

export interface PredictionInput {
  carat: number;
  cut: CutCategory;
  color: ColorCategory;
  clarity: ClarityCategory;
  depth: number;
  table: number;
  x: number;
  y: number;
  z: number;
}

export interface PredictionResponse {
  price: number;
  modelo: string;
  input: PredictionInput;
}
