/**
 * Middleware analítico. Mide en nanosegundos/milisegundos el tiempo neto que tardan
 * en ejecutarse los middlewares y respuestas subsiguientes dentro del flujo.
 */
export async function actionTracker(ctx: any, next: () => Promise<void>) {
  const inicio = performance.now();
  
  await next();
  
  const fin = performance.now();
  const delta = (fin - inicio).toFixed(2);
  
  console.log(`⏱️  [Performance Bot] Trigger '${ctx.message?.text || "Action"}': procesado en ${delta}ms`);
}