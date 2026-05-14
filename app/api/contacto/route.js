import { NextResponse } from "next/server";
import { validate_contact_payload } from "@/lib/contact_validation";
import { is_rate_limited } from "@/lib/contact_rate_limit";

/**
 * Obtiene una clave de cliente aproximada para rate limiting.
 * @param {Request} request - Solicitud HTTP entrante.
 * @returns {string} IP o valor sustituto.
 */
function get_client_key(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const real_ip = request.headers.get("x-real-ip");
  if (real_ip) return real_ip.trim();
  return "unknown";
}

/**
 * Reenvía el lead a un webhook opcional (CRM, Zapier, etc.).
 * @param {{ nombre: string; correo: string; telefono: string; tipo_servicio: string; mensaje: string }} payload - Datos validados.
 * @returns {Promise<boolean>} Verdadero si el webhook respondió 2xx.
 */
async function forward_to_webhook(payload) {
  const url = process.env.CONTACT_WEBHOOK_URL;
  if (!url) return false;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "computacion-web-contacto",
        ...payload,
      }),
      signal: controller.signal,
    });
    return res.ok;
  } catch (err) {
    console.error("[contacto] webhook falló:", err instanceof Error ? err.message : String(err));
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * POST /api/contacto — recibe cotizaciones del formulario público.
 * @param {Request} request - Cuerpo JSON del formulario.
 * @returns {Promise<Response>} JSON genérico sin filtrar detalles internos.
 */
export async function POST(request) {
  const key = get_client_key(request);
  if (is_rate_limited(key)) {
    return NextResponse.json(
      { ok: false, code: "rate_limited" },
      { status: 429 },
    );
  }

  const content_type = request.headers.get("content-type") ?? "";
  if (!content_type.includes("application/json")) {
    return NextResponse.json(
      { ok: false, code: "invalid_content_type" },
      { status: 415 },
    );
  }

  let json_body;
  try {
    json_body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, code: "invalid_json" }, { status: 400 });
  }

  const parsed = validate_contact_payload(json_body);
  if (!parsed.ok) {
    if (parsed.error === "spam") {
      return NextResponse.json({ ok: true }, { status: 200 });
    }
    return NextResponse.json({ ok: false, code: parsed.error }, { status: 400 });
  }

  const forwarded = await forward_to_webhook(parsed.value);
  if (process.env.NODE_ENV !== "production") {
    // Registro mínimo en desarrollo cuando no hay webhook.
    console.info("[contacto] lead recibido", {
      tipo_servicio: parsed.value.tipo_servicio,
      webhook_ok: forwarded,
    });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
