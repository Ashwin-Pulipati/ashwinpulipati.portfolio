import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function WorkPageSkeleton() {
  return (
    <main
      id="main-content"
      className={cn("space-y-8 md:space-y-10 lg:space-y-12")}
      aria-label="Loading selected work"
    >
      <section className="space-y-4 md:space-y-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          
          <div className="space-y-2">
            <Skeleton className="h-7 w-40 rounded-full" />
            
            <div className="space-y-2">
              <Skeleton className="h-9 w-[92%] max-w-2xl" />
              <Skeleton className="h-9 w-[70%] max-w-xl" />
            </div>
            
            <div className="space-y-2 pt-1">
              <Skeleton className="h-5 w-full max-w-2xl" />
              <Skeleton className="h-5 w-[92%] max-w-2xl" />
              <Skeleton className="h-5 w-[78%] max-w-xl" />
            </div>
          </div>
       
          <div className="space-y-2 md:text-right">
            <div className="flex flex-col gap-1 md:items-end">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-[220px] rounded-md" />
            </div>
            <Skeleton className="h-4 w-[260px] max-w-xs md:ml-auto" />
          </div>
        </div>
       
        <Skeleton className="h-4 w-52" />
      </section>
  
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
      <Skeleton className="h-44 w-full rounded-none" />

      <div className="space-y-3 p-4 sm:p-5">
        <Skeleton className="h-6 w-[85%]" />
        <Skeleton className="h-4 w-[70%]" />
        
        <div className="space-y-2 pt-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[92%]" />
          <Skeleton className="h-4 w-[78%]" />
        </div>
      
        <div className="flex flex-wrap gap-2 pt-1">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-9 w-24 rounded-md" />
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>
      </div>
    </div>
  );
}
