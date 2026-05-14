"use client";

/**
 * Error boundary de raíz con opción de reintentar.
 * @param {{ error: Error & { digest?: string }; reset: () => void }} props - Error y reset de Next.
 * @returns {import("react").ReactElement}
 */
export default function GlobalError({ error: _error, reset }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center text-slate-800 dark:text-slate-200">
      <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
        Algo salió mal
      </h1>
      <p className="mt-2 max-w-md text-sm text-slate-600 dark:text-slate-400">
        Intenta de nuevo. Si el problema continúa, vuelve más tarde.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-button bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
      >
        Reintentar
      </button>
    </div>
  );
}
