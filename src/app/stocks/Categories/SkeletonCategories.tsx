import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

interface SkeletonCategoriesProps {
  quantity?: number;
}

export default function SkeletonCategories({ quantity = 8 }: SkeletonCategoriesProps) {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <TableRow className="border-b border-b-primary/40 transition-all duration-300 hover:bg-skeleton" key={index}>
          {Array.from({ length: quantity }).map((_, index) => (
            <TableCell className="animate-pulse px-0 py-3" key={index}>
              <Skeleton className="bg-skeleton-foreground h-6 w-[70%] rounded-lg" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
