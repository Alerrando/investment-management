import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export default function SkeletonRankingCardCryptoMoreVisited() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index} className="border-b border-b-primary/40 transition-all duration-300">
          <TableCell className="animate-pulse px-4 py-3">
            <Skeleton className="h-6 w-full bg-skeleton" />
          </TableCell>
          <TableCell className="animate-pulse px-4 py-3">
            <Skeleton className="h-6 w-full rounded-lg bg-skeleton" />
          </TableCell>
          <TableCell className="animate-pulse px-4 py-3">
            <Skeleton className="h-6 w-full rounded-lg bg-skeleton" />
          </TableCell>
          <TableCell className="animate-pulse px-4 py-3">
            <Skeleton className="h-6 w-full rounded-lg bg-skeleton" />
          </TableCell>
          <TableCell className="animate-pulse px-4 py-3">
            <Skeleton className="h-6 w-full rounded-lg bg-skeleton" />
          </TableCell>
          <TableCell className="animate-pulse px-4 py-3">
            <Skeleton className="h-6 w-full rounded-lg bg-skeleton" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
