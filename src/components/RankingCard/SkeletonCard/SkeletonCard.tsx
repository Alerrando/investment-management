import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export default function SkeletonCard() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <TableRow className="border-b border-b-primary transition-all duration-300 hover:bg-skeleton" key={index}>
          <TableCell className="animate-pulse py-3 pl-4">
            <Skeleton className="bg-skeleton-foreground h-6 w-full rounded-lg" />
          </TableCell>
          <TableCell className="animate-pulse py-3 pl-4">
            <Skeleton className="bg-skeleton-foreground h-6 w-full rounded-lg" />
          </TableCell>
          <TableCell className="animate-pulse py-3 pl-4">
            <Skeleton className="bg-skeleton-foreground h-6 w-full rounded-lg" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
