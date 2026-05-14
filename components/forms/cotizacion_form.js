"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Formulario de cotización con envío a `/api/contacto`.
 * @returns {import("react").ReactElement}
 */
export function CotizacionForm() {
  const [status, set_status] = useState("idle");
  const [error_code, set_error_code] = useState("");

  /**
   * Envía los datos del formulario al endpoint de contacto.
   * @param {import("react").FormEvent} event - Evento submit nativo.
   * @returns {Promise<void>}
   */
  async function handle_submit(event) {
    event.preventDefault();
    set_status("loading");
    set_error_code("");
    const form = event.currentTarget;
    const form_data = new FormData(form);
    const payload = {
      nombre: String(form_data.get("nombre") ?? ""),
      correo: String(form_data.get("correo") ?? ""),
      telefono: String(form_data.get("telefono") ?? ""),
      tipo_servicio: String(form_data.get("tipo_servicio") ?? ""),
      mensaje: String(form_data.get("mensaje") ?? ""),
      website: String(form_data.get("website") ?? ""),
    };

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        set_status("error");
        set_error_code(typeof data.code === "string" ? data.code : "error");
        return;
      }
      set_status("success");
      form.reset();
    } catch {
      set_status("error");
      set_error_code("network");
    }
  }

  return (
    <form
      onSubmit={handle_submit}
      className="space-y-5 rounded-card border border-slate-300 bg-surface-elevated p-6 shadow-md ring-1 ring-slate-900/[0.04] dark:border-slate-800 dark:shadow-lg dark:ring-white/[0.06]"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="nombre">
            Nombre o empresa
          </label>
          <input
            id="nombre"
            name="nombre"
            required
            autoComplete="name"
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-accent focus:ring-2 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="correo">
            Correo
          </label>
          <input
            id="correo"
            name="correo"
            type="email"
            required
            autoComplete="email"
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-accent focus:ring-2 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="telefono">
            Teléfono
          </label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            required
            autoComplete="tel"
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-accent focus:ring-2 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>
        <div className="sm:col-span-2">
          <label
            className="block text-sm font-medium text-slate-700 dark:text-slate-200"
            htmlFor="tipo_servicio"
          >
            Tipo de servicio
          </label>
          <select
            id="tipo_servicio"
            name="tipo_servicio"
            required
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-accent focus:ring-2 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            defaultValue="equipos"
          >
            <option value="equipos">Equipos computacionales — venta / asesoría</option>
            <option value="reparacion">Reparación o mantenimiento</option>
            <option value="accesorios">Accesorios — venta / compatibilidad</option>
            <option value="otro">Otro</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="mensaje">
            Detalle de la necesidad
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            required
            rows={5}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-accent focus:ring-2 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            placeholder="Modelo de equipo, síntoma o accesorio buscado, dirección en Antofagasta, urgencia, etc."
          />
        </div>
      </div>

      {/* Honeypot anti-bots: debe permanecer oculto */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">No llenar</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className={cn(
          "inline-flex w-full items-center justify-center rounded-button bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto",
        )}
      >
        {status === "loading" ? "Enviando…" : "Enviar cotización"}
      </button>

      {status === "success" && (
        <p className="text-sm text-emerald-400" role="status">
          Mensaje enviado. Te contactaremos pronto.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400" role="alert">
          No pudimos enviar el formulario
          {error_code ? ` (${error_code})` : ""}. Intenta de nuevo o usa
          teléfono o correo.
        </p>
      )}
    </form>
  );
}
