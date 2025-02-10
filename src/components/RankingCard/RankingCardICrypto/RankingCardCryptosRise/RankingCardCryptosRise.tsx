import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { twMerge } from "tailwind-merge";

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
        "h-60 w-full rounded-lg border p-4 shadow-sm dark:border-[#2C2C2C] dark:bg-[#333333]",
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

      <ul className="flex w-full items-center justify-between gap-10 overflow-auto">
        {data &&
          data
            .filter((item: any, index, self) => index === self.findIndex((t: any) => t.name === item.name))
            .sort((item1, item2) => item2.price - item1.price)
            .filter((_, index) => index < 3)
            .map((item, index) => (
              <div
                className="flex w-full flex-col gap-8 rounded-lg border px-2 py-3 dark:border-[#444444] dark:bg-[#444444]"
                key={index}
              >
                <header className="flex h-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={item.image} alt="" className="h-10 w-10" />
                    <div className="flex h-full flex-col justify-between gap-1">
                      <span className="text-[9px] text-black/60 dark:text-gray-400">Proof of Stake</span>
                      <h2 className="text-[10px] text-gray-900 dark:text-white">{item.name}</h2>
                    </div>
                  </div>

                  <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-black">
                    <ArrowUpRight size={16} className="text-white" />
                  </div>
                </header>

                <div className="flex flex-col items-start justify-end gap-1">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-black/60 dark:text-gray-400">Price</span>
                    <h2 className="text-xl text-gray-900 dark:text-white">${item.price.toFixed(2)}</h2>
                  </div>

                  <div className="flex items-center gap-1">
                    <div className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-red-600">
                      <ArrowDownLeft size={14} className="text-white" />
                    </div>
                    <span className="text-xs text-red-600 dark:text-red-400">0.93%</span>
                  </div>
                </div>
              </div>
            ))}
      </ul>
    </div>
  );
}
