/**
 * Middleware de auditoría para Telegraf. Monitorea y muestra en la terminal 
 * los comandos entrantes junto al ID de Telegram y Username del emisor.
 */
export function sessionLogger(ctx: any, next: () => Promise<void>) {
  const deUsuario = ctx.from;
  const textoInvocado = ctx.message?.text || "[Acción de Botón o Multimedia]";
  
  const timestamp = new Date().toISOString();
  
  console.log(`\x1b[34m[Telegram Bot Logging - ${timestamp}]\x1b[0m`);
  console.log(`👤 Usuario: ${deUsuario?.first_name} ${deUsuario?.username ? `@${deUsuario.username}` : ""}`);
  console.log(`🆔 ID de Cuenta: ${deUsuario?.id}`);
  console.log(`💬 Input: ${textoInvocado}`);
  console.log(`--------------------------------------------------`);

  return next();
}