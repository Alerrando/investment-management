import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { twMerge } from "tailwind-merge";

import SkeletonRankingCardCryptosRise from "./SkeletonRankingCardCryptosRise/SkeletonRankingCardCryptosRise";

interface RankingCardCryptosRiseProps {
  title: string;
  data: any[];
  onViewAll: () => void;
  styleRankingCard?: string;
}

export default function RankingCardCryptosRise({
  title,
  data,
  onViewAll,
  styleRankingCard,
}: RankingCardCryptosRiseProps) {
  return (
    <div
      className={twMerge(
        "relative h-auto w-full rounded-lg border border-border bg-card p-4 shadow-sm",
        styleRankingCard,
      )}
    >
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-primary-t md:text-lg">{title}</h2>
        <button
          className="rounded-md border px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:bg-[#222] dark:text-gray-300 dark:hover:bg-[#444444]"
          onClick={onViewAll}
        >
          View All
        </button>
      </header>

      <ul className="flex w-full flex-col gap-4 overflow-x-auto md:flex-row md:items-center md:justify-between md:gap-10">
        {data && data.length > 0 ? (
          data
            ?.filter((item: any, index, self) => index === self.findIndex((t: any) => t.name === item.name))
            ?.sort((item1, item2) => item2.price - item1.price)
            ?.filter((_, index) => index < 3)
            ?.map((item, index) => (
              <div
                className="flex w-full flex-col gap-4 rounded-lg border border-border bg-card/60 p-2 md:w-1/3 md:gap-8 md:px-2 md:py-3"
                key={index}
              >
                <header className="flex h-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={item.image} alt="" className="h-8 w-8 md:h-10 md:w-10" />
                    <div className="flex h-full flex-col justify-between gap-1">
                      <span className="text-[9px] text-primary-t">Proof of Stake</span>
                      <h2 className="text-[10px] text-primary-t/60">{item.name}</h2>
                    </div>
                  </div>

                  <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-black">
                    <ArrowUpRight size={16} className="text-primary-t" />
                  </div>
                </header>

                <div className="flex flex-col items-start justify-end gap-1">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-primary-t/60">Price</span>
                    <h2 className="text-lg text-primary-t md:text-xl">${item.price.toFixed(2)}</h2>
                  </div>

                  <div className="flex items-center gap-1">
                    <div className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-red-600">
                      <ArrowDownLeft size={14} className="text-primary-t" />
                    </div>
                    <span className="text-xs text-red-600 dark:text-red-400">0.93%</span>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <SkeletonRankingCardCryptosRise />
        )}
      </ul>
    </div>
  );
}
