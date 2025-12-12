import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function HireMePageSkeleton() {
  return (
    <main
      id="main-content"
      className={cn("space-y-8 md:space-y-10 lg:space-y-12")}
      aria-label="Loading opportunities page"
    >
      <section
        aria-label="Fit at a glance and how to reach out (loading)"
        className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]"
      >
        {/* LEFT COLUMN */}
        <div className="space-y-6 md:space-y-7">
          <OpportunitiesIntroSkeleton />

          <Separator className="bg-border/60" />

          <QuickFactsInlineSkeleton />

          <Separator className="bg-border/60" />

          <DirectContactsSkeleton />

          <Separator className="bg-border/60" />

          <CalendlyBlockSkeleton />
        </div>
        <div className="space-y-4">
          <ContactSectionSkeleton />
        </div>
      </section>
    </main>
  );
}

function OpportunitiesIntroSkeleton() {
  return (
    <section className="space-y-4 md:space-y-5" aria-label="Loading intro">
      <header className="space-y-3">
        <Skeleton className="h-7 w-44 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-9 w-[92%] max-w-2xl" />
          <Skeleton className="h-9 w-[70%] max-w-xl" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-full max-w-2xl" />
          <Skeleton className="h-5 w-[90%] max-w-2xl" />
          <Skeleton className="h-5 w-[78%] max-w-xl" />
        </div>
      </header>
      
      <Skeleton className="h-4 w-72" />
    </section>
  );
}

function QuickFactsInlineSkeleton() {
  return (
    <section aria-label="Loading logistics" className="space-y-3">
      <Skeleton className="h-4 w-28" />
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex max-w-xs items-start gap-3 rounded-2xl border border-border/60 bg-card/60 p-3"
          >
            <Skeleton className="h-8 w-8 rounded-2xl shrink-0" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-[90%]" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function DirectContactsSkeleton() {
  return (
    <section aria-label="Loading direct contacts" className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-[92%] max-w-xl" />
      </div>

      <div className="flex flex-row flex-wrap items-center gap-4">
        <Skeleton className="h-11 w-24 rounded-md" />
        <Skeleton className="h-11 w-28 rounded-md" />
        <Skeleton className="h-11 w-24 rounded-md" />
      </div>
    </section>
  );
}

function CalendlyBlockSkeleton() {
  return (
    <section aria-label="Loading calendly block" className="space-y-2">
      <Skeleton className="h-4 w-28" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[92%] max-w-xl" />
        <Skeleton className="h-4 w-[70%] max-w-lg" />
      </div>
      <Skeleton className="h-11 w-64 rounded-md" />
    </section>
  );
}

function ContactSectionSkeleton() {
  return (
    <section
      aria-label="Loading contact form"
      className="surface-soft space-y-4 p-5 md:p-6"
    >
      <div className="space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-56" />
      </div>

      <div className="space-y-4">
       
        <div className="grid gap-3 md:grid-cols-2">
          <FieldSkeleton labelWidth="w-20" />
          <FieldSkeleton labelWidth="w-24" />
        </div>

        
        <div className="grid gap-3 md:grid-cols-2">
          <FieldSkeleton labelWidth="w-24" />
          <FieldSkeleton labelWidth="w-16" />
        </div>

        
        <div className="space-y-3 pt-2">
          <Skeleton className="h-4 w-40" />
          <div className="grid gap-2 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-card/50 px-3 py-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
         
          <Skeleton className="h-4 w-[92%] max-w-md" />
        </div>

        
        <FieldSkeleton labelWidth="w-36" />

       
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-[120px] w-full rounded-md" />
        </div>

        
        <div className="flex flex-col gap-3 pt-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-wrap xl:flex-nowrap">
            <Skeleton className="h-11 w-full sm:w-52 rounded-md" />
            <Skeleton className="h-11 w-full sm:w-52 rounded-md" />
          </div>
          <Skeleton className="h-4 w-72" />
        </div>
      </div>
    </section>
  );
}

function FieldSkeleton({ labelWidth }: { readonly labelWidth: string }) {
  return (
    <div className="space-y-1.5">
      <Skeleton className={cn("h-4", labelWidth)} />
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
}