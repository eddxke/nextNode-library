import fs from 'fs';
import path from 'path';

// Definimos un tipo estricto para los niveles de log permitidos
export type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';

// Ruta del archivo. __dirname resolverá la ruta actual.
const logFilePath: string = path.join(__dirname, 'server.log');

export const writeLog = (level: LogLevel, message: string): void => {
    const timestamp: string = new Date().toISOString();
    const logEntry: string = `[${timestamp}] [${level}]: ${message}\n`;

    // Tipamos explícitamente el error de Node.js
    fs.appendFile(logFilePath, logEntry, (err: NodeJS.ErrnoException | null) => {
        if (err) {
            console.error('Error crítico al escribir en el archivo de log:', err);
        }
    });
};