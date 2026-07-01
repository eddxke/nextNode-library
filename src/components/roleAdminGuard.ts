import type { Request, Response, NextFunction } from "express";

/**
 * Guard de control de acceso por roles. Requiere que un middleware previo
 * (como verifyJwt) haya inyectado el objeto user en la request.
 */
export function roleAdminGuard(req: Request, res: Response, next: NextFunction) {
  const usuario = (req as any).user;

  if (!usuario || usuario.role !== "admin") {
    return res.status(403).json({
      ok: false,
      error: "Privilegios insuficientes. Se requiere rol de Administrador."
    });
  }
  next();
}