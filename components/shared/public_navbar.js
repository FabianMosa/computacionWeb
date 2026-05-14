import Link from "next/link";
import { site_config } from "@/lib/site_config";
import { ThemeToggleButton } from "@/components/shared/theme_toggle_button";
import { cn } from "@/lib/utils";

const nav_links = [
  { href: "/", label: "Inicio" },
  { href: "/equipos", label: "Equipos" },
  { href: "/servicios/reparacion", label: "Reparación" },
  { href: "/servicios/accesorios", label: "Accesorios" },
  { href: "/contacto", label: "Contacto" },
];

/**
 * Barra de navegación principal del sitio público.
 * @returns {import("react").ReactElement}
 */
export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-300 bg-brand/95 backdrop-blur dark:border-slate-800">
      <div className="mx-auto flex max-w-content items-center justify-between gap-3 px-4 py-3 sm:gap-4">
        <Link
          href="/"
          className="text-lg font-bold text-slate-900 dark:text-white"
        >
          {site_config.site_name}
        </Link>
        <nav
          className="hidden items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex"
          aria-label="Principal"
        >
          {nav_links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 hover:bg-slate-200 hover:text-slate-900",
                "dark:hover:bg-slate-800 dark:hover:text-white",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggleButton />
          <Link
            href="/contacto"
            className="rounded-button bg-accent px-3 py-2 text-xs font-semibold text-accent-foreground sm:text-sm"
          >
            Cotizar
          </Link>
        </div>
      </div>
      <nav
        className="flex gap-2 overflow-x-auto border-t border-slate-300 px-4 py-2 text-xs font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300 md:hidden"
        aria-label="Secciones"
      >
        {nav_links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 rounded-md px-2 py-1 hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
