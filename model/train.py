import os
import json
import numpy as np
import pandas as pd
import seaborn as sns
import joblib
from sklearn.preprocessing import OrdinalEncoder, StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

# Rutas de salida
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
API_DIR = os.path.join(BASE_DIR, "api")
PUBLIC_DIR = os.path.join(BASE_DIR, "public")

os.makedirs(API_DIR, exist_ok=True)
os.makedirs(PUBLIC_DIR, exist_ok=True)

# Carga del dataset
df = sns.load_dataset("diamonds")
total_original = len(df)
print(f"Registros originales: {total_original}")

# Limpieza: remover registros con dimensiones fisicas = 0
df = df[(df["x"] > 0) & (df["y"] > 0) & (df["z"] > 0)]
total_limpio = len(df)
print(f"Registros despues de limpieza: {total_limpio}")

# Separar features y variable objetivo
X = df.drop("price", axis=1)
y = df["price"]

# Ordenes para OrdinalEncoder (alineados con notebook E2)
cut_order = ["Fair", "Good", "Very Good", "Premium", "Ideal"]
color_order = ["J", "I", "H", "G", "F", "E", "D"]
clarity_order = ["I1", "SI2", "SI1", "VS2", "VS1", "VVS2", "VVS1", "IF"]

# Codificacion ordinal
encoder = OrdinalEncoder(categories=[cut_order, color_order, clarity_order])
X[["cut", "color", "clarity"]] = encoder.fit_transform(X[["cut", "color", "clarity"]])

feature_names = X.columns.tolist()
print(f"Features: {feature_names}")

# Division train/test (alineado con notebook E2)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
print(f"Entrenamiento: {X_train.shape[0]}, Prueba: {X_test.shape[0]}")

# Estandarizacion (alineado con notebook E2)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Entrenar modelos (alineados con notebook E2)
modelos = {
    "Regresion Lineal": LinearRegression(),
    "Arbol de Decision": DecisionTreeRegressor(random_state=42, max_depth=10),
    "Random Forest": RandomForestRegressor(n_estimators=50, random_state=42, max_depth=15),
}

resultados = {}
mejor_r2 = -1
mejor_nombre = ""

for nombre, modelo in modelos.items():
    modelo.fit(X_train_scaled, y_train)
    y_pred = modelo.predict(X_test_scaled)

    r2 = r2_score(y_test, y_pred)
    mae = mean_absolute_error(y_test, y_pred)
    mse = mean_squared_error(y_test, y_pred)
    rmse = float(np.sqrt(mse))

    resultados[nombre] = {
        "R2": round(r2, 4),
        "MAE": round(mae, 2),
        "MSE": round(mse, 2),
        "RMSE": round(rmse, 2),
    }

    print(f"{nombre}: R2={r2:.4f}, MAE=${mae:.2f}, RMSE=${rmse:.2f}")

    if r2 > mejor_r2:
        mejor_r2 = r2
        mejor_nombre = nombre
        mejor_modelo = modelo

print(f"\nMejor modelo: {mejor_nombre} (R2={mejor_r2:.4f})")

# Feature importance del Random Forest
rf = modelos["Random Forest"]
importancia = dict(zip(feature_names, [round(float(v), 4) for v in rf.feature_importances_]))

# Exportar modelos como joblib para la API
joblib.dump(mejor_modelo, os.path.join(API_DIR, "model.joblib"), compress=3)
joblib.dump(scaler, os.path.join(API_DIR, "scaler.joblib"), compress=3)
joblib.dump(encoder, os.path.join(API_DIR, "encoder.joblib"), compress=3)
print(f"Modelos exportados a {API_DIR}")

# Exportar datos del dashboard como JSON
dashboard_data = {
    "metricas": resultados,
    "mejor_modelo": mejor_nombre,
    "importancia_features": importancia,
    "feature_names": feature_names,
    "ordinal_categories": {
        "cut": cut_order,
        "color": color_order,
        "clarity": clarity_order,
    },
    "dataset_info": {
        "total_original": total_original,
        "total_limpio": total_limpio,
        "registros_train": int(X_train.shape[0]),
        "registros_test": int(X_test.shape[0]),
    },
    "criterios_exito": {
        "R2_umbral": 0.85,
        "MAE_umbral": 800,
    },
}

json_path = os.path.join(PUBLIC_DIR, "dashboard_data.json")
with open(json_path, "w") as f:
    json.dump(dashboard_data, f, indent=2)
print(f"Dashboard data exportado a {json_path}")

print("\nEntrenamiento y exportacion completados.")
