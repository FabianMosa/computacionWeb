const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 8;
const CLEANUP_INTERVAL_MS = 60 * 60 * 1000; // 1 hora

/** @type {Map<string, number[]>} */
const buckets = new Map();

// Limpieza periódica de entradas inactivas para evitar memory leak.
// No impide la salida del proceso (unref) — no bloquea el event loop si la app quiere cerrarse.
const cleanup_timer = setInterval(() => {
  const now = Date.now();
  for (const [key, stamps] of buckets) {
    const active = stamps.filter((t) => now - t < WINDOW_MS);
    if (active.length === 0) {
      buckets.delete(key);
    } else {
      buckets.set(key, active);
    }
  }
}, CLEANUP_INTERVAL_MS);

cleanup_timer.unref();

/**
 * Limpia marcas de tiempo fuera de la ventana deslizante.
 * @param {number[]} stamps - Marcas UTC en ms.
 * @param {number} now - Tiempo actual en ms.
 * @returns {number[]} Marcas vigentes.
 */
function prune_stamps(stamps, now) {
  return stamps.filter((t) => now - t < WINDOW_MS);
}

/**
 * Indica si una clave (p. ej. IP) superó el límite de solicitudes.
 * @param {string} key - Identificador del cliente.
 * @returns {boolean} Verdadero si debe bloquearse la solicitud.
 */
export function is_rate_limited(key) {
  const now = Date.now();
  const prev = buckets.get(key) ?? [];
  const stamps = prune_stamps(prev, now);
  if (stamps.length >= MAX_REQUESTS) {
    buckets.set(key, stamps);
    return true;
  }
  stamps.push(now);
  buckets.set(key, stamps);
  return false;
}
