// Lista blanca de IDs numéricos de Telegram con permisos de superusuario
const ADMINS_ID = [123456789, 987654321]; 

/**
 * Guard de autorización de Telegram. Valida el ID del emisor contra la
 * lista blanca estática de administradores autorizados.
 */
export function adminBotGuard(ctx: any, next: () => Promise<void>) {
  const userId = ctx.from?.id;

  if (!userId || !ADMINS_ID.includes(userId)) {
    return ctx.reply("❌ Operación denegada. Este comando está reservado exclusivamente para los administradores del Bot.");
  }
  return next();
}