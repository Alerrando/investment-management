import { twMerge } from "tailwind-merge";

import Spinner from "@/components/Spinner/Spinner";

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
        "w-full rounded-lg border p-4 shadow-sm dark:border-[#444444] dark:bg-[#2C2C2C]",
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
          <Spinner />
        )}
      </ul>
    </div>
  );
}
