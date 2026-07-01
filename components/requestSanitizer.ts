import type { Request, Response, NextFunction } from "express";

/**
 * Middleware que recorre de forma recursiva un objeto y remueve tags HTML/Scripts
 * para mitigar ataques XSS reflejados básicos.
 */
function limpiarString(input: string): string {
  return input.replace(/<[^>]*>?/gm, "").trim();
}

function sanitizarObjeto(obj: any): any {
  if (typeof obj !== "object" || obj === null) return obj;
  for (const llave in obj) {
    if (typeof obj[llave] === "string") {
      obj[llave] = limpiarString(obj[llave]);
    } else if (typeof obj[llave] === "object") {
      obj[llave] = sanitizarObjeto(obj[llave]);
    }
  }
  return obj;
}

export function requestSanitizer(req: Request, res: Response, next: NextFunction) {
  if (req.body) req.body = sanitizarObjeto(req.body);
  if (req.query) req.query = sanitizarObjeto(req.query);
  next();
}