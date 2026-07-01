import rateLimit from "express-rate-limit";
import type { Request, Response, NextFunction } from "express";

/**
 * Middleware para limitar ráfagas de peticiones abusivas en endpoints de Express.
 * Restringe a un máximo de 100 peticiones cada 15 minutos por dirección IP.
 */
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de 100 IPs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    error: "Demasiadas peticiones desde esta IP. Por favor, inténtalo más tarde."
  }
});