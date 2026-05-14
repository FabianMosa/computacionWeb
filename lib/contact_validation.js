const MAX_MESSAGE = 4000;
const MAX_NAME = 120;

/**
 * @typedef {object} contact_payload
 * @property {string} nombre
 * @property {string} correo
 * @property {string} telefono
 * @property {"equipos"|"reparacion"|"accesorios"|"otro"} tipo_servicio
 * @property {string} mensaje
 */

/**
 * Valida el cuerpo JSON del formulario de cotización.
 * @param {unknown} body - Objeto parseado del cliente.
 * @returns {{ ok: true, value: contact_payload } | { ok: false, error: string }}
 */
export function validate_contact_payload(body) {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "payload_invalido" };
  }

  const record = /** @type {Record<string, unknown>} */ (body);

  const nombre = typeof record.nombre === "string" ? record.nombre.trim() : "";
  const correo = typeof record.correo === "string" ? record.correo.trim() : "";
  const telefono =
    typeof record.telefono === "string" ? record.telefono.trim() : "";
  const tipo_servicio =
    typeof record.tipo_servicio === "string"
      ? record.tipo_servicio.trim()
      : "";
  const mensaje =
    typeof record.mensaje === "string" ? record.mensaje.trim() : "";
  const website_honeypot =
    typeof record.website === "string" ? record.website.trim() : "";

  if (website_honeypot.length > 0) {
    return { ok: false, error: "spam" };
  }

  if (!nombre || nombre.length > MAX_NAME) {
    return { ok: false, error: "nombre_invalido" };
  }

  if (!is_valid_email(correo)) {
    return { ok: false, error: "correo_invalido" };
  }

  if (!telefono || telefono.length > 40) {
    return { ok: false, error: "telefono_invalido" };
  }

  // Validación para Chile: +56 seguido de 8-9 dígitos (móvil 9, fijo 2/55/etc.)
  if (!/^\+56\s?\d{8,9}$/.test(telefono.replace(/\s/g, ""))) {
    return { ok: false, error: "telefono_invalido" };
  }

  const allowed = new Set(["equipos", "reparacion", "accesorios", "otro"]);
  if (!allowed.has(tipo_servicio)) {
    return { ok: false, error: "tipo_invalido" };
  }

  if (!mensaje || mensaje.length > MAX_MESSAGE) {
    return { ok: false, error: "mensaje_invalido" };
  }

  return {
    ok: true,
    value: {
      nombre,
      correo,
      telefono,
      tipo_servicio,
      mensaje,
    },
  };
}

/**
 * Comprueba formato básico de correo electrónico.
 * @param {string} value - Cadena a validar.
 * @returns {boolean} Verdadero si parece un correo válido.
 */
function is_valid_email(value) {
  if (!value || value.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
