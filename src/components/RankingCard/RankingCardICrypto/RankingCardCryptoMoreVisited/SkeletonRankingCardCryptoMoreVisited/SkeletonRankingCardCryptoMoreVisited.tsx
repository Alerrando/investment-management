import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export default function SkeletonRankingCardCryptoMoreVisited() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow
          key={index}
          className="border-b border-b-[#F2F2F2] transition-all duration-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
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
          <TableCell className="px-4 py-3">
            <Skeleton className="h-6 w-full" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
