import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

// Clave secreta por defecto o recuperada del entorno del sistema
const JWT_SECRET = process.env.JWT_SECRET || "clave_secreta_intercept_2026";

/**
 * Guard de autenticación para Express. Extrae el token del Header 'Authorization',
 * lo decodifica e inyecta la metadata del usuario decodificado en la petición.
 */
export function verifyJwt(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      ok: false,
      error: "Acceso denegado. No se proporcionó un token de autorización válido."
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Inyección dinámica de contexto seguro en la request
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      ok: false,
      error: "Token inválido, expirado o alterado."
    });
  }
}