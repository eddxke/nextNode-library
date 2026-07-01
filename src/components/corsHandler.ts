import cors from "cors";
import type { Request, Response, NextFunction } from "express";

/**
 * Middleware de configuración de CORS seguro.
 * Permite credenciales y restringe métodos HTTP permitidos en la API.
 */
export const corsHandler = cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",") : "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
});