import type { Request, Response, NextFunction } from "express";

/**
 * Guard para validar la existencia de datos en el cuerpo de la petición.
 * Rechaza la petición si el req.body está vacío o no es un objeto válido.
 */
export function validateBody(req: Request, res: Response, next: NextFunction) {
  if (!req.body || typeof req.body !== "object" || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      ok: false,
      error: "Petición inválida. El cuerpo (body) no puede estar vacío."
    });
  }
  next();
}