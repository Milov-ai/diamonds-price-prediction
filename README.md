# 💎 Diamond Price Predictor

Dashboard de predicción de precios de diamantes con Machine Learning.

> Proyecto Final — Machine Learning — Institución Universitaria Pascual Bravo

## Demo

🔗 **[Ver Dashboard en Vivo](https://diamonds-price-prediction-a8oa.vercel.app)**

📦 **[Repositorio GitHub](https://github.com/Milov-ai/diamonds-price-prediction)**

## Arquitectura

```
React (browser) ──POST /api/predict──► Python Serverless (Vercel)
                                       │
                                       ├─ Carga Random Forest (joblib)
                                       ├─ Escala features (StandardScaler)
                                       └─ Retorna precio predicho
```

### Pipeline de Deployment

```
git push main → Vercel Build → pip install + python train.py → npm run build → Deploy
```

## Tecnologías

| Frontend | Backend | ML | Deploy |
|---|---|---|---|
| React + TypeScript | Vercel Serverless (Python) | scikit-learn | Vercel |
| Vite | joblib | Random Forest | GitHub |
| Tailwind CSS v4 | | StandardScaler | CI/CD Pipeline |
| Recharts | | OrdinalEncoder | |

## Métricas del Modelo

| Modelo | R² | MAE | RMSE |
|---|---|---|---|
| Regresión Lineal | 0.9100 | $790.37 | $1,201.39 |
| Árbol de Decisión | 0.9763 | $332.84 | $616.13 |
| **Random Forest** | **0.9835** | **$261.31** | **$514.35** |

## Estructura del Proyecto

```
diamonds-price-prediction/
├── api/              ← Serverless function (Python)
│   ├── predict.py
│   └── requirements.txt
├── model/            ← Script de entrenamiento
│   └── train.py
├── src/              ← Frontend (React + TS)
│   ├── components/
│   ├── hooks/
│   ├── types/
│   └── utils/
├── notebooks/        ← Jupyter notebooks
├── docs/             ← Documentos Word
└── vercel.json       ← Config pipeline
```

## Correr Localmente

```bash
# Instalar dependencias
npm install
pip install -r requirements.txt

# Entrenar modelo y generar datos
python model/train.py

# Iniciar servidor de desarrollo
npm run dev
```

## Metodología

**CRISP-DM** (Cross Industry Standard Process for Data Mining)

1. Business Understanding → Definición del problema
2. Data Understanding → Exploración del dataset
3. Data Preparation → Limpieza + encoding + scaling
4. Modeling → 3 modelos supervisados
5. Evaluation → Métricas + ética + sesgos
6. **Deployment → Este dashboard**

## Integrantes

- Carlos Andrés Rivera Morales
- Alejandra Múnera Monsalve
- Julián Andrés Gómez Rueda
- Cristian Camilo Jaramillo Rojas
- Camilo Zuleta Delgado

**Docente:** Wilson Andrés Ramírez Ríos

## Licencia

MIT
