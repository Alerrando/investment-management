import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export default function SkeletonListStock() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <TableRow key={index} className="border-b transition-all duration-300 hover:bg-primary/20">
          <TableCell className="animation-pulse px-4 py-3">
            <Skeleton className="h-6 w-full" />
          </TableCell>
          <TableCell className="animation-pulse px-4 py-3">
            <Skeleton className="h-6 w-full" />
          </TableCell>
          <TableCell className="animation-pulse px-4 py-3">
            <Skeleton className="h-6 w-full" />
          </TableCell>
          <TableCell className="animation-pulse px-4 py-3">
            <Skeleton className="h-6 w-full" />
          </TableCell>
          <TableCell className="animation-pulse px-4 py-3">
            <Skeleton className="h-6 w-full" />
          </TableCell>
          <TableCell className="animation-pulse px-4 py-3">
            <Skeleton className="h-6 w-full" />
          </TableCell>
          <TableCell className="animation-pulse px-4 py-3">
            <Skeleton className="h-6 w-full" />
          </TableCell>
          <TableCell className="animation-pulse px-4 py-3">
            <Skeleton className="h-6 w-full" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
