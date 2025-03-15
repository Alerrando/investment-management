import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function SkeletonAssetManagement() {
  return (
    <table className="w-full table-auto border-collapse text-left text-sm">
      <TableHeader className="sticky top-0 z-10 bg-primary">
        <TableRow>
          <TableHead className="animate-pulse px-4 py-3">
            <Skeleton className="h-4 w-16 bg-skeleton" />
          </TableHead>
          <TableHead className="animate-pulse px-4 py-3">
            <Skeleton className="h-4 w-16 bg-skeleton" />
          </TableHead>
          <TableHead className="animate-pulse px-4 py-3">
            <Skeleton className="h-4 w-16 bg-skeleton" />
          </TableHead>
          <TableHead className="animate-pulse px-4 py-3">
            <Skeleton className="h-4 w-16 bg-skeleton" />
          </TableHead>
          <TableHead className="animate-pulse px-4 py-3">
            <Skeleton className="h-4 w-16 bg-skeleton" />
          </TableHead>
        </TableRow>
      </TableHeader>

      <tbody>
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index} className="border-primary-80 border-b transition-all duration-300">
            <TableCell className="animate-pulse px-4 py-3">
              <Skeleton className="h-6 w-full bg-skeleton" />
            </TableCell>
            <TableCell className="animate-pulse px-4 py-3">
              <Skeleton className="h-6 w-full bg-skeleton" />
            </TableCell>
            <TableCell className="animate-pulse px-4 py-3">
              <Skeleton className="h-6 w-full bg-skeleton" />
            </TableCell>
            <TableCell className="animate-pulse px-4 py-3">
              <Skeleton className="h-6 w-full bg-skeleton" />
            </TableCell>
            <TableCell className="animate-pulse px-4 py-3">
              <Skeleton className="h-6 w-full bg-skeleton" />
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </table>
  );
}
