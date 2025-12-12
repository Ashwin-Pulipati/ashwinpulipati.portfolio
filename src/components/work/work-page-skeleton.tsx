import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function WorkPageSkeleton() {
  return (
    <main
      id="main-content"
      className={cn("space-y-8 md:space-y-10 lg:space-y-12")}
      aria-label="Loading selected work"
    >
      {/* Header section */}
      <section className="space-y-4 md:space-y-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          {/* Left copy */}
          <div className="space-y-2">
            {/* Badge skeleton */}
            <Skeleton className="h-7 w-40 rounded-full" />

            {/* H1 skeleton (2 lines like your heading) */}
            <div className="space-y-2">
              <Skeleton className="h-9 w-[92%] max-w-2xl" />
              <Skeleton className="h-9 w-[70%] max-w-xl" />
            </div>

            {/* Intro paragraph skeleton (3 lines) */}
            <div className="space-y-2 pt-1">
              <Skeleton className="h-5 w-full max-w-2xl" />
              <Skeleton className="h-5 w-[92%] max-w-2xl" />
              <Skeleton className="h-5 w-[78%] max-w-xl" />
            </div>
          </div>

          {/* Right filter block */}
          <div className="space-y-2 md:text-right">
            <div className="flex flex-col gap-1 md:items-end">
              <Skeleton className="h-4 w-28" />
              {/* Select trigger skeleton */}
              <Skeleton className="h-10 w-[220px] rounded-md" />
            </div>
            {/* Description under select */}
            <Skeleton className="h-4 w-[260px] max-w-xs md:ml-auto" />
          </div>
        </div>

        {/* "Showing X of Y..." line */}
        <Skeleton className="h-4 w-52" />
      </section>

      {/* Grid section */}
      <section
        aria-label="Project gallery loading"
        className="grid gap-8 lg:gap-12 md:grid-cols-2 xl:grid-cols-3"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </section>
    </main>
  );
}

function ProjectCardSkeleton() {
  return (
    <div className="surface-soft overflow-hidden">
      {/* image */}
      <Skeleton className="h-44 w-full rounded-none" />

      <div className="space-y-3 p-4 sm:p-5">
        {/* title */}
        <Skeleton className="h-6 w-[85%]" />
        {/* subtitle */}
        <Skeleton className="h-4 w-[70%]" />

        {/* description (3 lines) */}
        <div className="space-y-2 pt-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[92%]" />
          <Skeleton className="h-4 w-[78%]" />
        </div>

        {/* tags row */}
        <div className="flex flex-wrap gap-2 pt-1">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>

        {/* buttons/links row */}
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-9 w-24 rounded-md" />
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>
      </div>
    </div>
  );
}
