import Image from "next/image";
import Link from "next/link";
import { photo_refs } from "@/lib/photo_refs";
import { site_config } from "@/lib/site_config";

export const metadata = {
  title: "Equipos computacionales",
  description: `Cotización de equipos computacionales en ${site_config.city}. Asesoría por uso y presupuesto, sin compra online.`,
};

/**
 * Página de venta/cotización de equipos computacionales.
 * @returns {import("react").ReactElement}
 */
export default function EquiposPage() {
  return (
    <div className="mx-auto max-w-content px-4 py-12 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            Equipos computacionales en {site_config.city}
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Te ayudamos a elegir hardware que dure más y cueste menos en
            mantenimiento. Cotizamos según software, espacio y presupuesto. No
            vendemos por carrito web: revisamos tu caso y te proponemos
            alternativas.
          </p>
          <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-300">
            <li>Notebooks y PCs de escritorio para hogar, oficina o estudio</li>
            <li>Balance entre rendimiento, consumo y posibilidad de upgrade</li>
            <li>Orientación a planes de mantenimiento para ahorrar a futuro</li>
          </ul>
          <Link
            href="/contacto"
            className="mt-8 inline-flex rounded-button bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:bg-amber-400"
          >
            Solicitar cotización de equipo
          </Link>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-slate-200 dark:border-slate-800">
          <Image
            src={photo_refs.equipos_computacionales}
            alt="Equipos de escritorio — cotización y venta en Antofagasta"
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
}
