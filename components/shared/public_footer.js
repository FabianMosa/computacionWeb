import Link from "next/link";
import { site_config } from "@/lib/site_config";

/**
 * Pie de página con datos de contacto y enlaces rápidos.
 * @returns {import("react").ReactElement}
 */
export function PublicFooter() {
  return (
    <footer className="border-t border-slate-300 bg-brand-muted/60 dark:border-slate-800">
      <div className="mx-auto grid max-w-content gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            {site_config.site_name}
          </p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            {site_config.tagline}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            Contacto
          </p>
          <ul className="mt-2 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>
              <a href={site_config.phone_href} className="hover:text-accent">
                {site_config.phone_display}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site_config.email}`}
                className="hover:text-accent"
              >
                {site_config.email}
              </a>
            </li>
            <li>
              <Link href="/contacto" className="hover:text-accent">
                Formulario de cotización
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            Cobertura
          </p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Servicios en {site_config.city}, {site_config.country}. Sustituye
            este texto por comunas y horarios reales.
          </p>
        </div>
      </div>
      <div className="border-t border-slate-300 py-4 text-center text-xs text-slate-500 dark:border-slate-800">
        © {new Date().getFullYear()} {site_config.site_name}. Datos de ejemplo —
        reemplazar antes de producción.
      </div>
    </footer>
  );
}
