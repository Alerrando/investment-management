"use client";

interface RankingCardItemCryptoProps {
  item: any;
  index: number;
}

export default function RankingCardItemCrypto({ item, index }: RankingCardItemCryptoProps) {
  return (
    <li
      key={index}
      className="flex items-center justify-between rounded-lg border-b border-b-[#F2F2F2] p-2 hover:bg-[#F2F2F2] dark:border-b-[#555] dark:hover:bg-[#444444]"
    >
      <div className="flex items-center gap-2">
        <img src={item.image} alt={item.name} className="h-8 w-8 rounded-full" />
        <div>
          <h3 className="text-sm text-gray-900 dark:text-white">{item.stock}</h3>
          <p className="text-[10px] text-gray-500 dark:text-gray-400">{item.name}</p>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <p className="text-sm font-semibold text-green-500 dark:text-green-400">R${item.price}</p>
      </div>
    </li>
  );
}
