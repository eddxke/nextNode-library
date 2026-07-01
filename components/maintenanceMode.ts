// Cambiar a 'true' para activar el bloqueo de la plataforma de mensajería
const EN_MANTENIMIENTO = false;

/**
 * Middleware de contingencia operacional. Corta el pipeline enviando una alerta
 * visual estandarizada si el sistema está bajo labores de mantenimiento.
 */
export function maintenanceMode(ctx: any, next: () => Promise<void>) {
  if (EN_MANTENIMIENTO) {
    return ctx.reply("⚙️ *Sistema en Mantenimiento*\n\nEstamos mejorando nuestros servidores en este momento. Inténtalo de nuevo en unos minutos.", { parse_mode: "Markdown" });
  }
  return next();
}