import Image from "next/image";
import Link from "next/link";
import { photo_refs } from "@/lib/photo_refs";
import { site_config } from "@/lib/site_config";
import { ServiceCard } from "@/components/ui/service_card";

export const metadata = {
  title: "Inicio",
  description: `${site_config.tagline} Cotización sin compra online.`,
};

/**
 * Página de inicio: hero, pilares y CTA a contacto.
 * @returns {import("react").ReactElement}
 */
export default function HomePage() {
  return (
    <div>
      <section className="relative isolate overflow-hidden border-b border-slate-300 dark:border-slate-800">
        <Image
          src={photo_refs.hero_tecnico_computacion}
          alt="Técnico revisando equipamiento computacional en taller"
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent" />
        <div className="relative mx-auto flex max-w-content flex-col gap-6 px-4 py-16 sm:py-24 lg:flex-row lg:items-end lg:justify-between lg:py-28">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wide text-accent">
              {site_config.city}, {site_config.country}
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              Ahorra con mantenimiento: equipos, reparación y accesorios
            </h1>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-300 sm:text-lg">
              Mantenimiento preventivo para alargar la vida útil de tus equipos,
              reparación con diagnóstico claro y venta de accesorios con
              asesoría. Atención en Antofagasta y alrededores.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center rounded-button bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow hover:bg-amber-400"
              >
                Pedir cotización
              </Link>
              <Link
                href={site_config.whatsapp_href}
                className="inline-flex items-center justify-center rounded-button border border-slate-400 px-5 py-3 text-sm font-medium text-slate-800 hover:border-accent hover:text-slate-950 dark:border-slate-600 dark:text-slate-100 dark:hover:text-white"
              >
                WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900/45">
        <div className="mx-auto max-w-content px-4 py-14 sm:py-16">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl">
            Qué hacemos
          </h2>
          <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
            Tres líneas para que pagues menos a largo plazo: equipos adecuados a
            tu uso, mantenimiento que evita paradas caras y accesorios con
            buena relación calidad-precio.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ServiceCard
              service_title="Equipos computacionales"
              body_text="Cotización de PCs, notebooks y estaciones de trabajo según tu presupuesto y carga de trabajo. Sin checkout online."
              link_href="/equipos"
              image_src={photo_refs.equipos_computacionales}
              image_alt="Equipos de escritorio y monitores — venta y cotización asesorada"
            />
            <ServiceCard
              service_title="Reparación y mantenimiento"
              body_text="Diagnóstico, limpieza, actualización de componentes y planes de mantenimiento para ahorrar en averías mayores."
              link_href="/servicios/reparacion"
              image_src={photo_refs.taller_reparacion}
              image_alt="Reparación de hardware en taller — diagnóstico y mantenimiento"
            />
            <ServiceCard
              service_title="Venta de accesorios"
              body_text="Teclados, mouse, cables, almacenamiento y más: te orientamos según compatibilidad y necesidad real."
              link_href="/servicios/accesorios"
              image_src={photo_refs.accesorios_perifericos}
              image_alt="Periféricos y accesorios para computación"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-slate-300 bg-slate-200/90 dark:border-slate-800 dark:bg-brand-muted/40">
        <div className="mx-auto flex max-w-content flex-col gap-6 px-4 py-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              ¿Listo para cotizar?
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Completa el formulario o escríbenos por WhatsApp. Respondemos en
              horario hábil en Antofagasta.
            </p>
          </div>
          <Link
            href="/contacto"
            className="inline-flex shrink-0 items-center justify-center rounded-button bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:bg-amber-400"
          >
            Ir a contacto
          </Link>
        </div>
      </section>
    </div>
  );
}
