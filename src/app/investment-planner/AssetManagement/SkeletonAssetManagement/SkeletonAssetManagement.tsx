import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonAssetManagement() {
  return (
    <table className="w-full table-auto border-collapse text-left text-sm text-gray-600 dark:text-gray-300">
      <thead className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-800">
        <tr>
          <th className="px-4 py-3">
            <Skeleton className="h-4 w-16" />
          </th>
          <th className="px-4 py-3">
            <Skeleton className="h-4 w-16" />
          </th>
          <th className="px-4 py-3">
            <Skeleton className="h-4 w-16" />
          </th>
          <th className="px-4 py-3">
            <Skeleton className="h-4 w-16" />
          </th>
          <th className="px-4 py-3">
            <Skeleton className="h-4 w-16" />
          </th>
        </tr>
      </thead>

      <tbody>
        {Array.from({ length: 5 }).map((_, index) => (
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
          </tr>
        ))}
      </tbody>
    </table>
  );
}
