import Image from "next/image";
import Link from "next/link";
import { photo_refs } from "@/lib/photo_refs";
import { site_config } from "@/lib/site_config";

export const metadata = {
  title: "Venta de accesorios",
  description: `Accesorios y periféricos en ${site_config.city}. Cotización según compatibilidad; sin checkout online.`,
};

/**
 * Página de venta y asesoría de accesorios computacionales.
 * @returns {import("react").ReactElement}
 */
export default function AccesoriosPage() {
  return (
    <div className="mx-auto max-w-content px-4 py-12 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            Accesorios y periféricos
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Te orientamos para no comprar de más: cables correctos, fuentes
            adecuadas, monitores según resolución real de uso y almacenamiento
            compatible con tu equipo.
          </p>
          <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-300">
            <li>Teclados, mouse, hubs USB, adaptadores y audio</li>
            <li>Discos SSD/HDD, memorias RAM y accesorios de refrigeración</li>
            <li>Combos que encajan con tu flujo de trabajo y presupuesto</li>
          </ul>
          <Link
            href="/contacto"
            className="mt-8 inline-flex rounded-button bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:bg-amber-400"
          >
            Cotizar accesorios
          </Link>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-slate-200 dark:border-slate-800">
          <Image
            src={photo_refs.accesorios_perifericos}
            alt="Periféricos y accesorios para computación"
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
}
