/**
 * Une clases CSS condicionales en una sola cadena.
 * @param {...(string|undefined|null|false)} parts - Fragmentos de clase.
 * @returns {string} Cadena única para `className`.
 */
export function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}
