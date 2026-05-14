/**
 * UI de carga global (skeleton simple).
 * @returns {import("react").ReactElement}
 */
export default function Loading() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center px-4">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent border-t-transparent" />
    </div>
  );
}
