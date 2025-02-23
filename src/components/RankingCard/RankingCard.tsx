import { twMerge } from "tailwind-merge";

import { Skeleton } from "../ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import RankingCardItemStock from "./RankingCardItemStock/RankingCardItemStock";

interface RankingCardProps {
  title: string;
  data: any[];
  onViewAll: () => void;
  styleRankingCard?: string;
}

export default function RankingCard({ title, data, onViewAll, styleRankingCard }: RankingCardProps) {
  function formatMarketCap(value: any) {
    if (value >= 1e12) {
      return `${(value / 1e12).toFixed(2)}T`;
    } else if (value >= 1e9) {
      return `${(value / 1e9).toFixed(2)}B`;
    } else if (value >= 1e6) {
      return `${(value / 1e6).toFixed(2)}M`;
    } else {
      return value.toLocaleString();
    }
  }

  return (
    <div
      className={twMerge(
        "z-30 w-full rounded-lg border p-4 shadow-sm dark:border-[#444444] dark:bg-[#2C2C2C]",
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

      <Table className="w-full overflow-auto">
        <TableHeader>
          <TableRow className="border-b-[#F2F2F2] dark:border-b-[#444444]">
            <TableHead className="text-gray-900 dark:text-white">Nome</TableHead>
            <TableHead className="text-gray-900 dark:text-white">Volume</TableHead>
            <TableHead className="text-gray-900 dark:text-white">Preço</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            <>
              {data.map((item, index) => (
                <TableRow
                  key={index}
                  className="border-b border-b-[#F2F2F2] transition-all duration-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  <RankingCardItemStock
                    name={item.name}
                    volume={item.volume}
                    price={item.price}
                    marketCap={formatMarketCap(item.marketCap)}
                  />
                </TableRow>
              ))}
            </>
          ) : (
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <TableRow
                  className="border-b border-b-[#F2F2F2] transition-all duration-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                  key={index}
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
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
