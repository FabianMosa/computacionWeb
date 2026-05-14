import { CotizacionForm } from "@/components/forms/cotizacion_form";
import { site_config } from "@/lib/site_config";

export const metadata = {
  title: "Contacto y cotización",
  description: `Formulario de cotización en ${site_config.city}. Ahorra con mantenimiento: equipos, reparación y accesorios.`,
};

/**
 * Página de contacto con formulario de cotización.
 * @returns {import("react").ReactElement}
 */
export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-content px-4 py-12 sm:py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
          Cotización en {site_config.city}
        </h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Completa el formulario. No almacenamos datos en esta demo salvo que
          configures un webhook o proveedor de correo en el servidor (ver{" "}
          <code className="rounded bg-slate-200 px-1 text-xs text-slate-800 dark:bg-slate-800 dark:text-slate-100">.env.example</code>
          ).
        </p>
      </div>
      <div className="mt-10 grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <CotizacionForm />
        </div>
        <aside className="space-y-4 rounded-card border border-slate-300 bg-surface-elevated p-5 text-sm text-slate-600 shadow-md ring-1 ring-slate-900/[0.04] dark:border-slate-800 dark:text-slate-400 dark:shadow-lg dark:ring-white/[0.06] lg:col-span-2">
          <p className="font-semibold text-slate-900 dark:text-white">Otros canales</p>
          <p>
            Teléfono:{" "}
            <a className="text-accent" href={site_config.phone_href}>
              {site_config.phone_display}
            </a>
          </p>
          <p>
            Correo:{" "}
            <a
              className="text-accent"
              href={`mailto:${site_config.email}`}
            >
              {site_config.email}
            </a>
          </p>
          <p>
            WhatsApp:{" "}
            <a className="text-accent" href={site_config.whatsapp_href}>
              Abrir chat
            </a>
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500">
            Sustituye teléfono, correo y enlace de WhatsApp en{" "}
            <code className="rounded bg-slate-200 px-1 text-slate-800 dark:bg-slate-900 dark:text-slate-100">lib/site_config.js</code>
            .
          </p>
        </aside>
      </div>
    </div>
  );
}
