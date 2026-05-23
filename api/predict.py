from http.server import BaseHTTPRequestHandler
import json
import os
import numpy as np
import joblib

# Cargar modelo, scaler y encoder al inicio (cold start)
API_DIR = os.path.dirname(os.path.abspath(__file__))
model = joblib.load(os.path.join(API_DIR, "model.joblib"))
scaler = joblib.load(os.path.join(API_DIR, "scaler.joblib"))
encoder = joblib.load(os.path.join(API_DIR, "encoder.joblib"))

# Ordenes para validacion
CUT_VALUES = ["Fair", "Good", "Very Good", "Premium", "Ideal"]
COLOR_VALUES = ["J", "I", "H", "G", "F", "E", "D"]
CLARITY_VALUES = ["I1", "SI2", "SI1", "VS2", "VS1", "VVS2", "VVS1", "IF"]


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            body = json.loads(self.rfile.read(content_length))

            # Validar campos requeridos
            required = ["carat", "cut", "color", "clarity", "depth", "table", "x", "y", "z"]
            for field in required:
                if field not in body:
                    self._respond(400, {"error": f"Campo requerido: {field}"})
                    return

            # Validar categoricas
            if body["cut"] not in CUT_VALUES:
                self._respond(400, {"error": f"cut invalido. Valores: {CUT_VALUES}"})
                return
            if body["color"] not in COLOR_VALUES:
                self._respond(400, {"error": f"color invalido. Valores: {COLOR_VALUES}"})
                return
            if body["clarity"] not in CLARITY_VALUES:
                self._respond(400, {"error": f"clarity invalido. Valores: {CLARITY_VALUES}"})
                return

            # Codificar ordinales
            cut_encoded = CUT_VALUES.index(body["cut"])
            color_encoded = COLOR_VALUES.index(body["color"])
            clarity_encoded = CLARITY_VALUES.index(body["clarity"])

            # Construir vector de features (mismo orden que el entrenamiento)
            features = np.array([[
                float(body["carat"]),
                float(cut_encoded),
                float(color_encoded),
                float(clarity_encoded),
                float(body["depth"]),
                float(body["table"]),
                float(body["x"]),
                float(body["y"]),
                float(body["z"]),
            ]])

            # Escalar y predecir
            features_scaled = scaler.transform(features)
            prediction = model.predict(features_scaled)[0]
            price = max(0, float(prediction))

            self._respond(200, {
                "price": round(price, 2),
                "modelo": "Random Forest",
                "input": body,
            })

        except json.JSONDecodeError:
            self._respond(400, {"error": "JSON invalido"})
        except Exception as e:
            self._respond(500, {"error": str(e)})

    def do_OPTIONS(self):
        self.send_response(200)
        self._set_cors_headers()
        self.end_headers()

    def _respond(self, status, data):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self._set_cors_headers()
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())

    def _set_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
