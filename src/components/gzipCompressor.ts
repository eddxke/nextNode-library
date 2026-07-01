import compression from "compression";
import type { Request, Response, NextFunction } from "express";

/**
 * Middleware de rendimiento. Aplica compresión GZIP a payloads de respuesta
 * que superen 1KB de tamaño, acelerando la transferencia en red.
 */
export const gzipCompressor = compression({
  threshold: 1024,
  filter: (req: Request, res: Response) => {
    if (req.headers["x-no-compression"]) return false;
    return compression.filter(req, res);
  }
});