import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function SkeletonAssetManagement() {
  return (
    <table className="w-full table-auto border-collapse text-left text-sm text-gray-600 dark:text-gray-300">
      <TableHeader className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-800">
        <TableRow>
          <TableHead className="animate-pulse px-4 py-3">
            <Skeleton className="h-4 w-16" />
          </TableHead>
          <TableHead className="animate-pulse px-4 py-3">
            <Skeleton className="h-4 w-16" />
          </TableHead>
          <TableHead className="animate-pulse px-4 py-3">
            <Skeleton className="h-4 w-16" />
          </TableHead>
          <TableHead className="animate-pulse px-4 py-3">
            <Skeleton className="h-4 w-16" />
          </TableHead>
          <TableHead className="animate-pulse px-4 py-3">
            <Skeleton className="h-4 w-16" />
          </TableHead>
        </TableRow>
      </TableHeader>

      <tbody>
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow
            key={index}
            className="border-b transition-all duration-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <TableCell className="px-4 py-3">
              <Skeleton className="h-6 w-full" />
            </TableCell>
            <TableCell className="px-4 py-3">
              <Skeleton className="h-6 w-full" />
            </TableCell>
            <TableCell className="px-4 py-3">
              <Skeleton className="h-6 w-full" />
            </TableCell>
            <TableCell className="px-4 py-3">
              <Skeleton className="h-6 w-full" />
            </TableCell>
            <TableCell className="px-4 py-3">
              <Skeleton className="h-6 w-full" />
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </table>
  );
}
