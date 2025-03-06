import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export default function SkeletonRankingCardCryptoMoreVisited() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index} className="border-b border-b-primary/40 transition-all duration-300 hover:bg-skeleton">
          <TableCell className="animate-pulse px-4 py-3">
            <Skeleton className="bg-skeleton-foreground h-6 w-full" />
          </TableCell>
          <TableCell className="animate-pulse px-4 py-3">
            <Skeleton className="bg-skeleton-foreground h-6 w-full rounded-lg" />
          </TableCell>
          <TableCell className="animate-pulse px-4 py-3">
            <Skeleton className="bg-skeleton-foreground h-6 w-full rounded-lg" />
          </TableCell>
          <TableCell className="animate-pulse px-4 py-3">
            <Skeleton className="bg-skeleton-foreground h-6 w-full rounded-lg" />
          </TableCell>
          <TableCell className="animate-pulse px-4 py-3">
            <Skeleton className="bg-skeleton-foreground h-6 w-full rounded-lg" />
          </TableCell>
          <TableCell className="animate-pulse px-4 py-3">
            <Skeleton className="bg-skeleton-foreground h-6 w-full rounded-lg" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
