import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export default function SkeletonCategories() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <TableRow
          className="border-b border-b-[#F2F2F2] transition-all duration-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          key={index}
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <TableCell className="animate-pulse py-3 pl-4" key={index}>
              <Skeleton className="h-6 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
