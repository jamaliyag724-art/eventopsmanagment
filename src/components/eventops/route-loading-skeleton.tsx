import { Skeleton } from "@/components/ui/skeleton";

export function RouteLoadingSkeleton({
  workspace = false,
}: {
  workspace?: boolean;
}) {
  if (workspace) {
    return (
      <div
        role="status"
        aria-live="polite"
        aria-label="Loading Utsav workspace"
        aria-busy="true"
        className="min-h-screen bg-background text-foreground"
      >
        <span className="sr-only">Loading Utsav workspace…</span>
        <aside className="fixed inset-y-0 left-0 hidden w-[264px] border-r border-border bg-sidebar p-5 md:block">
          <div className="mb-8 flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-lg" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="mb-5 h-12 w-full rounded-lg" />
          <Skeleton className="mb-3 h-3 w-24" />
          <div className="space-y-3">
            {Array.from({ length: 9 }).map((_, index) => (
              <Skeleton key={index} className="h-9 w-full rounded-md" />
            ))}
          </div>
        </aside>

        <div className="md:ml-[264px]">
          <header className="flex h-[65px] items-center justify-between border-b border-border px-5 md:px-8">
            <Skeleton className="h-4 w-36" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-44 rounded-lg" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </header>
          <main className="mx-auto max-w-[1540px] space-y-5 px-4 py-7 md:px-8">
            <Skeleton className="h-56 w-full rounded-2xl" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-28 rounded-xl" />
              ))}
            </div>
            <div className="grid gap-5 xl:grid-cols-[1.7fr_0.9fr]">
              <div className="grid gap-4 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-xl border border-border bg-card p-3"
                  >
                    <Skeleton className="h-36 w-full rounded-lg" />
                    <Skeleton className="mt-3 h-4 w-3/4" />
                    <Skeleton className="mt-2 h-3 w-1/2" />
                    <Skeleton className="mt-4 h-2 w-full rounded-full" />
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <Skeleton className="h-56 rounded-xl" />
                <Skeleton className="h-44 rounded-xl" />
              </div>
            </div>
          </main>
        </div>
        <span className="sr-only">Please wait while the page loads.</span>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading Utsav page"
      aria-busy="true"
      className="min-h-screen bg-background text-foreground"
    >
      <span className="sr-only">Loading Utsav page…</span>
      <header className="flex h-16 items-center justify-between border-b border-border px-6 md:px-12">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="hidden items-center gap-6 md:flex">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-3 w-14" />
          ))}
        </div>
        <Skeleton className="h-9 w-24 rounded-md" />
      </header>
      <main className="mx-auto grid max-w-[1160px] gap-10 px-6 py-12 md:grid-cols-2 md:items-center md:py-20">
        <div className="space-y-5">
          <Skeleton className="h-3 w-48" />
          <Skeleton className="h-14 w-full max-w-xl" />
          <Skeleton className="h-14 w-5/6 max-w-lg" />
          <Skeleton className="h-4 w-full max-w-lg" />
          <Skeleton className="h-4 w-4/5 max-w-md" />
          <div className="flex gap-3 pt-3">
            <Skeleton className="h-11 w-36 rounded-md" />
            <Skeleton className="h-11 w-32 rounded-md" />
          </div>
        </div>
        <Skeleton className="aspect-[4/3] w-full rounded-xl" />
      </main>
    </div>
  );
}
