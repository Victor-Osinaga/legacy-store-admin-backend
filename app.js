import express from "express";
import cors from "cors";
import { v1ClientRouter } from "./src/router/client/client.router.js";
import cookieParser from "cookie-parser";
import config from "./config.js";

const app = express();

// PARA DEFINIR URL BASE
const allowedOrigins = [
  "https://legacy-panel.vercel.app", // PANEL FRONT PROD
  "http://localhost:5173", // PANEL FRONT DEV
];

// PARA DEFINIR SI ES UN SUBDOMINIO
let allowedOriginPatternFrontStore;
if (config.env == "dev") {
  allowedOriginPatternFrontStore =
    /^https?:\/\/([a-z0-9-]+)-legacystore\.localhost(:\d+)?$/;
} else {
  allowedOriginPatternFrontStore =
    /^https?:\/\/([a-z0-9-]+)-legacystore\.vercel\.app$/;
}

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      console.log("CORS: Solicitud sin origen (permitida)");
      return callback(null, true);
    }

    // 🔹 Normalizar el origin (eliminar barra final si existe)
    const normalizedOrigin = origin.replace(/\/$/, "");
    console.log("origen normalizado: ", normalizedOrigin);

    // Validar contra allowedOrigins
    if (allowedOrigins.includes(normalizedOrigin)) {
      // console.log(`CORS: Dominio permitido -> ${origin}`);
      return callback(null, true);
    }

    // Validar contra el patrón dinámico para subdominios
    if (allowedOriginPatternFrontStore.test(normalizedOrigin)) {
      // console.log(`CORS: Subdominio permitido -> ${origin}`);
      return callback(null, true);
    }

    // Bloquear otros orígenes
    console.error(`CORS: Origen bloqueado -> ${normalizedOrigin}`);
    return callback(new Error("No permitido por CORS"));
  },
  credentials: true, // Habilita el envío de credenciales
};

// Aplica CORS a todas las rutas
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/api-admin/clients", v1ClientRouter);

app.all("*", (req, res) => {
  res.json({
    error: "404 NotFoud",
    desc: "No se encontro la pagina que buscas legacy store admin",
  });
});

export { app };
