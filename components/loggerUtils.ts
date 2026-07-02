import { Request, Response, NextFunction } from 'express';
import { promises as fs } from 'node:fs';
import * as path from 'node:path';

export type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';

/**
 * Middleware de Auditoría y Logs Automatizados para Express
 * Inyectado vía nextNode-cli
 */
const loggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Se genera en la raíz del proyecto destino de forma segura
  const logFilePath = path.resolve(process.cwd(), 'server.log');
  
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] [INFO]: ${req.method} ${req.url} - IP: ${req.ip}\n`;

  // Escritura asíncrona "fire-and-forget" para no bloquear la respuesta HTTP
  fs.appendFile(logFilePath, logEntry, 'utf-8').catch((err) => {
    console.error('⚠️ [nextNode Error] No se pudo escribir en server.log:', err.message);
  });

  // Continuar obligatoriamente con el siguiente middleware en el pipeline
  next();
};

export default loggerMiddleware;