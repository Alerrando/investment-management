import { twMerge } from "tailwind-merge";

import { Skeleton } from "@/components/ui/skeleton";

import RankingCardItemCrypto from "./RankingCardItemCrypto/RankingCardItemCrypto";

interface RankingCardICryptoProps {
  title: string;
  data: any[];
  onViewAll: () => void;
  styleRankingCard?: string;
}

export default function RankingCardICrypto({ title, data, onViewAll, styleRankingCard }: RankingCardICryptoProps) {
  return (
    <div
      className={twMerge(
        "relative w-full rounded-lg border p-4 shadow-sm dark:border-[#444444] dark:bg-[#2C2C2C]",
        styleRankingCard,
      )}
    >
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button
          className="rounded-md border px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:bg-[#222] dark:text-gray-300 dark:hover:bg-[#444444]"
          onClick={onViewAll}
        >
          View All
        </button>
      </header>

      <ul className="space-y-4 overflow-y-auto">
        {data && data.length > 0 ? (
          <>
            {data?.map((item, index) => (
              <RankingCardItemCrypto item={item} index={index} key={`ranking-cark-crypto-${index}`} />
            ))}
          </>
        ) : (
          <table className="w-full table-auto border-collapse text-left text-sm text-gray-600 dark:text-gray-300">
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
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </ul>
    </div>
  );
}
