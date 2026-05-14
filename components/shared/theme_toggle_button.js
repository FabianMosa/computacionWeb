"use client";

import { useCallback, useEffect, useState } from "react";
import {
  theme_storage_key,
  theme_value_dark,
  theme_value_light,
} from "@/lib/theme_constants";
import { cn } from "@/lib/utils";

/**
 * Aplica el tema en `<html>` y persiste en `localStorage`.
 * @param {"light" | "dark"} mode - Modo visual deseado.
 * @returns {void}
 */
function apply_theme_mode(mode) {
  const root = document.documentElement;
  if (mode === theme_value_dark) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  try {
    localStorage.setItem(theme_storage_key, mode);
  } catch {
    /* ignore quota / private mode */
  }
}

/**
 * Indica si la clase `dark` está activa en el documento.
 * @returns {boolean}
 */
function read_is_dark_from_dom() {
  return document.documentElement.classList.contains("dark");
}

/**
 * Botón accesible que alterna entre tema claro y oscuro (iconos sol / luna).
 * @returns {import("react").ReactElement}
 */
export function ThemeToggleButton() {
  const [is_dark, set_is_dark] = useState(true);
  const [is_mounted, set_is_mounted] = useState(false);

  useEffect(() => {
    set_is_dark(read_is_dark_from_dom());
    set_is_mounted(true);
  }, []);

  /**
   * Alterna entre tema claro y oscuro.
   * @returns {void}
   */
  const handle_toggle = useCallback(() => {
    const next_is_dark = !read_is_dark_from_dom();
    apply_theme_mode(next_is_dark ? theme_value_dark : theme_value_light);
    set_is_dark(next_is_dark);
  }, []);

  const label = is_dark ? "Activar tema claro" : "Activar tema oscuro";

  return (
    <button
      type="button"
      onClick={handle_toggle}
      className={cn(
        "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-800 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        "dark:border-slate-600 dark:bg-slate-900 dark:text-amber-100 dark:hover:bg-slate-800",
      )}
      aria-label={label}
      title={label}
    >
      {is_mounted ? (
        is_dark ? (
          <SunIcon />
        ) : (
          <MoonIcon />
        )
      ) : (
        <span className="block h-5 w-5 rounded-sm bg-slate-200/80 dark:bg-slate-700/80" aria-hidden />
      )}
    </button>
  );
}

/**
 * Icono de sol (tema claro disponible).
 * @returns {import("react").ReactElement}
 */
function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

/**
 * Icono de luna (tema oscuro disponible).
 * @returns {import("react").ReactElement}
 */
function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
