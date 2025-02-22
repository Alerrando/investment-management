import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonListStock() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <tr
          key={index}
          className="border-b transition-all duration-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          <td className="px-4 py-3">
            <Skeleton className="h-6 w-full" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-6 w-full" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-6 w-full" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-6 w-full" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-6 w-full" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-6 w-full" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-6 w-full" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-6 w-full" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-6 w-full" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-6 w-full" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-6 w-full" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-6 w-full" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-6 w-full" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-6 w-full" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-6 w-full" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-6 w-full" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-6 w-full" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-6 w-full" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-6 w-full" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-6 w-full" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-6 w-full" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-6 w-full" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-6 w-full" />
          </td>
        </tr>
      ))}
    </>
  );
}
