import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonRankingCardCryptosRise() {
  return (
    <ul className="flex w-full items-center justify-between gap-10 overflow-auto">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          className="flex w-full flex-col gap-8 rounded-lg border px-2 py-3 hover:bg-skeleton dark:border-[#444444]"
          key={index}
        >
          <header className="flex h-full items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10 animate-pulse bg-skeleton-foreground" />
              <div className="flex h-full flex-col justify-between gap-1">
                <Skeleton className="h-[9px] w-9 animate-pulse bg-skeleton-foreground" />
                <Skeleton className="h-[10px] w-14 animate-pulse bg-skeleton-foreground" />
              </div>
            </div>

            <Skeleton className="h-6 w-6 bg-skeleton-foreground" />
          </header>

          <div className="flex flex-col items-start justify-end gap-1">
            <div className="flex flex-col gap-1">
              <Skeleton className="h-[9px] w-9 animate-pulse bg-skeleton-foreground" />
              <Skeleton className="h-[20px] w-16 animate-pulse bg-skeleton-foreground" />
            </div>

            <div className="flex items-center gap-1">
              <Skeleton className="h-4 w-4 animate-pulse bg-skeleton-foreground" />
              <Skeleton className="h-3 w-3 animate-pulse bg-skeleton-foreground" />
            </div>
          </div>
        </div>
      ))}
    </ul>
  );
}
