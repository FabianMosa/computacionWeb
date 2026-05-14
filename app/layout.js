import "./globals.css";
import { ThemeInitScript } from "@/components/shared/theme_init_script";
import { site_config } from "@/lib/site_config";

const default_site_url =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(default_site_url),
  title: {
    default: `${site_config.site_name} | ${site_config.city}`,
    template: `%s | ${site_config.site_name}`,
  },
  description: site_config.tagline,
  openGraph: {
    locale: "es_CL",
    type: "website",
  },
};

/**
 * Layout raíz: envoltura HTML global.
 * @param {{ children: import("react").ReactNode }} props - Contenido de la app.
 * @returns {import("react").ReactElement}
 */
export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeInitScript />
        {children}
      </body>
    </html>
  );
}
