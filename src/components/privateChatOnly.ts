/**
 * Guard de filtrado de entorno. Asegura que el bot solo responda
 * e interactúe si el mensaje proviene de un chat directo privado.
 */
export function privateChatOnly(ctx: any, next: () => Promise<void>) {
  const tipoChat = ctx.chat?.type;

  if (tipoChat !== "private") {
    // Registramos silenciosamente en consola y cortamos el pipeline sin responder en el grupo
    console.log(`[Filtro] Comando ignorado en chat de tipo: ${tipoChat}`);
    return; 
  }
  return next();
}