import Image from "next/image";
import Link from "next/link";
import { photo_refs } from "@/lib/photo_refs";
import { site_config } from "@/lib/site_config";

export const metadata = {
  title: "Reparación y mantenimiento",
  description: `Taller y mantenimiento de equipos computacionales en ${site_config.city}. Ahorra con mantenimiento preventivo y reparación con cotización previa.`,
};

/**
 * Página de servicios de reparación y mantenimiento.
 * @returns {import("react").ReactElement}
 */
export default function ReparacionPage() {
  return (
    <div className="mx-auto max-w-content px-4 py-12 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-slate-200 dark:border-slate-800 lg:order-2">
          <Image
            src={photo_refs.taller_reparacion}
            alt="Taller de reparación de equipos — diagnóstico y mantenimiento con cotización"
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
        </div>
        <div className="lg:order-1">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            Reparación y mantenimiento
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            <strong className="font-semibold text-slate-800 dark:text-slate-200">
              Ahorra con mantenimiento:
            </strong>{" "}
            la limpieza, pasta térmica y revisiones periódicas suelen evitar
            fallas mayores. Cada intervención parte de diagnóstico y cotización
            explícita.
          </p>
          <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-300">
            <li>Mantenimiento preventivo y actualización de almacenamiento o RAM</li>
            <li>Diagnóstico de fallas de hardware y optimización de sistema</li>
            <li>Respaldo de datos y recomendaciones antes de reemplazar piezas</li>
          </ul>
          <Link
            href="/contacto"
            className="mt-8 inline-flex rounded-button bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:bg-amber-400"
          >
            Agendar revisión
          </Link>
        </div>
      </div>
    </div>
  );
}
