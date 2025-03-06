import { twMerge } from "tailwind-merge";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ListCryptoModel } from "@/models/Lists/ListCryptoModel";

import SkeletonRankingCardCryptoMoreVisited from "./SkeletonRankingCardCryptoMoreVisited/SkeletonRankingCardCryptoMoreVisited";

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
        "relative h-60 w-full overflow-y-auto rounded-lg border bg-card p-4 shadow-sm dark:border-[#444444]",
        styleRankingCard,
      )}
    >
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-primary">{title}</h2>
        <button
          className="rounded-md border px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:bg-[#222] dark:text-gray-300 dark:hover:bg-[#444444]"
          onClick={onViewAll}
        >
          View All
        </button>
      </header>

      <Table className="w-full overflow-auto">
        <TableHeader>
          <TableRow className="border-b-primary/40 hover:bg-primary/10">
            <TableHead className="text-primary">Nome</TableHead>
            <TableHead className="text-primary">Cap. de Mercado</TableHead>
            <TableHead className="text-primary">Volume</TableHead>
            <TableHead className="text-primary">Fornecimento total</TableHead>
            <TableHead className="text-primary">FDV</TableHead>
            <TableHead className="text-primary">Preço</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data
              ?.filter((item, index, self) => index === self.findIndex((t) => t.name === item.name))
              ?.sort((item1, item2) => item2.price - item1.price)
              ?.filter((_, index) => index < 3)
              ?.map((item: ListCryptoModel, index) => (
                <TableRow className="border-b-primary/40" key={index}>
                  <TableCell className="text-primary">
                    <div className="flex h-full items-center justify-start gap-2">
                      <img src={item.image} alt="" className="h-8 w-8" />
                      <div className="flex h-full flex-col justify-between py-2">
                        <span className="text-[9px] text-primary/60">Proof of Stake</span>
                        <h2 className="text-[10px]">{item.name}</h2>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-primary">
                    <div className="flex flex-col justify-center">
                      <span>{item.marketCap}</span>
                      <span
                        className={`text-[10px] ${parseFloat(item.marketCapPercentage.split("-")[0]) > 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {item.marketCapPercentage}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-primary">
                    <div className="flex w-fit flex-col items-end">
                      <span>{item.volume}</span>
                      <span
                        className={`text-[10px] ${parseFloat(item.volumePercentage.split("-")[0]) > 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {item.volumePercentage}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-primary">
                    <span className="text-center">{item.circulatingSupply || "---"}</span>
                  </TableCell>

                  <TableCell className="text-primary">{item.fdv || "---"}</TableCell>
                  <TableCell className="text-primary">${item.price.toFixed(2)}</TableCell>
                </TableRow>
              ))
          ) : (
            <SkeletonRankingCardCryptoMoreVisited />
          )}
        </TableBody>
      </Table>
    </div>
  );
}
