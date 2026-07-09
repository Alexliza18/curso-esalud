import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function GallerySkeleton() {
  return (
    <div className="grid auto-rows-[150px] grid-cols-2 gap-4 sm:auto-rows-[180px] md:grid-cols-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("rounded-2xl", i === 0 && "col-span-2 row-span-2", i === 3 && "col-span-2")}
        />
      ))}
    </div>
  );
}
