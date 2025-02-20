import { twMerge } from "tailwind-merge";

import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ListCryptoModel } from "@/models/Lists/ListCryptoModel";

interface RankingCardCryptoMoreVisitedProps {
  title: string;
  data?: ListCryptoModel[];
  onViewAll: () => void;
  styleRankingCard?: string;
}

export default function RankingCardCryptoMoreVisited({
  title,
  data,
  onViewAll,
  styleRankingCard,
}: RankingCardCryptoMoreVisitedProps) {
  return (
    <div
      className={twMerge(
        "relative h-60 w-full overflow-y-auto rounded-lg border p-4 shadow-sm dark:border-[#444444] dark:bg-[#2C2C2C]",
        styleRankingCard,
      )}
    >
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
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
            <TableHead className="text-gray-900 dark:text-white">Cap. de Mercado</TableHead>
            <TableHead className="text-gray-900 dark:text-white">Volume</TableHead>
            <TableHead className="text-gray-900 dark:text-white">Fornecimento total</TableHead>
            <TableHead className="text-gray-900 dark:text-white">FDV</TableHead>
            <TableHead className="text-gray-900 dark:text-white">Preço</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data
              ?.filter((item, index, self) => index === self.findIndex((t) => t.name === item.name))
              ?.sort((item1, item2) => item2.price - item1.price)
              ?.filter((_, index) => index < 3)
              ?.map((item: ListCryptoModel, index) => (
                <TableRow className="border-b-[#F2F2F2] dark:border-b-[#444444]" key={index}>
                  <TableCell className="text-gray-900 dark:text-white">
                    <div className="flex h-full items-center justify-start gap-2">
                      <img src={item.image} alt="" className="h-8 w-8" />
                      <div className="flex h-full flex-col justify-between py-2">
                        <span className="text-[9px] text-black/60 dark:text-gray-400">Proof of Stake</span>
                        <h2 className="text-[10px]">{item.name}</h2>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-gray-900 dark:text-white">
                    <div className="flex flex-col justify-center">
                      <span>{item.marketCap}</span>
                      <span
                        className={`text-[10px] ${parseFloat(item.marketCapPercentage.split("-")[0]) > 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {item.marketCapPercentage}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-gray-900 dark:text-white">
                    <div className="flex w-fit flex-col items-end">
                      <span>{item.volume}</span>
                      <span
                        className={`text-[10px] ${parseFloat(item.volumePercentage.split("-")[0]) > 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {item.volumePercentage}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-gray-900 dark:text-white">
                    <span className="text-center">{item.circulatingSupply || "---"}</span>
                  </TableCell>

                  <TableCell className="text-gray-900 dark:text-white">{item.fdv || "---"}</TableCell>
                  <TableCell className="text-gray-900 dark:text-white">${item.price.toFixed(2)}</TableCell>
                </TableRow>
              ))
          ) : (
            <>
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
