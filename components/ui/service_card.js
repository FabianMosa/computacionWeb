import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Tarjeta de servicio con imagen, texto y enlace.
 * @param {{ service_title: string; body_text: string; link_href: string; image_src: string; image_alt: string }} props - Contenido de la tarjeta.
 * @returns {import("react").ReactElement}
 */
export function ServiceCard({
  service_title,
  body_text,
  link_href,
  image_src,
  image_alt,
}) {
  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-card border border-slate-300 bg-surface-elevated shadow-md ring-1 ring-slate-900/[0.04] dark:border-slate-800 dark:shadow-lg dark:ring-white/[0.06]",
      )}
    >
      <div className="relative h-44 w-full sm:h-48">
        <Image
          src={image_src}
          alt={image_alt}
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          {service_title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-400">
          {body_text}
        </p>
        <Link
          href={link_href}
          className="mt-4 inline-flex text-sm font-semibold text-accent hover:text-amber-700 dark:hover:text-amber-300"
        >
          Ver más
        </Link>
      </div>
    </article>
  );
}
