import Script from "next/script";
import { get_theme_bootstrap_script_source } from "@/lib/theme_constants";

/**
 * Script de arranque del tema (`beforeInteractive`) para aplicar la clase en `<html>` antes del paint.
 * @returns {import("react").ReactElement}
 */
export function ThemeInitScript() {
  return (
    <Script id="theme-bootstrap" strategy="beforeInteractive">
      {get_theme_bootstrap_script_source()}
    </Script>
  );
}
