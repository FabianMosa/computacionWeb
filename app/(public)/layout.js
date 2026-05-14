import { PublicFooter } from "@/components/shared/public_footer";
import { PublicNavbar } from "@/components/shared/public_navbar";
import { Whatsapp_float_button } from "@/components/shared/whatsapp_float_button";

/**
 * Layout del grupo público: navegación y pie comunes.
 * @param {{ children: import("react").ReactNode }} props - Páginas hijas.
 * @returns {import("react").ReactElement}
 */
export default function PublicLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNavbar />
      <main className="flex-1">{children}</main>
      <PublicFooter />
      <Whatsapp_float_button />
    </div>
  );
}
