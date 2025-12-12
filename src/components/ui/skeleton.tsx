import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "relative overflow-hidden rounded-md bg-accent/60",
        "before:absolute before:inset-0",
        "before:-translate-x-full before:animate-[shimmer_1.4s_infinite]",
        "before:bg-linear-to-r before:from-transparent before:via-white/20 before:to-transparent",
        "dark:before:via-white/10",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
