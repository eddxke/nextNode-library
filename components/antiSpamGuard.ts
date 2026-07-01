// Almacenamiento volátil en memoria local para rastrear marcas de tiempo por ID de usuario
const historialSpam = new Map<number, number>();

/**
 * Guard anti-spam. Bloquea el pipeline si un usuario ejecuta el mismo trigger
 * en un intervalo menor a 1.5 segundos.
 */
export function antiSpamGuard(ctx: any, next: () => Promise<void>) {
  const userId = ctx.from?.id;
  if (!userId) return next();

  const ahora = Date.now();
  const ultimaPeticion = historialSpam.get(userId) || 0;

  if (ahora - ultimaPeticion < 1500) {
    return ctx.reply("⚠️ ¡Por favor, no envíes comandos tan rápido! Espera un momento.");
  }

  historialSpam.set(userId, ahora);
  return next();
}