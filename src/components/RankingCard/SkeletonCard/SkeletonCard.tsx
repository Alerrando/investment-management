import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export default function SkeletonCard() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <TableRow className="border-b border-b-primary transition-all duration-300" key={index}>
          <TableCell className="animate-pulse py-3 pl-4">
            <Skeleton className="h-6 w-full rounded-lg bg-skeleton" />
          </TableCell>
          <TableCell className="animate-pulse py-3 pl-4">
            <Skeleton className="h-6 w-full rounded-lg bg-skeleton" />
          </TableCell>
          <TableCell className="animate-pulse py-3 pl-4">
            <Skeleton className="h-6 w-full rounded-lg bg-skeleton" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
