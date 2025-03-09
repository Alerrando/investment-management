"use client";

interface RankingCardItemCryptoProps {
  item: any;
  index: number;
}

export default function RankingCardItemCrypto({ item, index }: RankingCardItemCryptoProps) {
  return (
    <li key={index} className="flex items-center justify-between rounded-lg border-b p-2 hover:bg-skeleton">
      <div className="flex items-center gap-2">
        <img src={item.image} alt={item.name} className="h-8 w-8 rounded-full" />
        <div>
          <h3 className="text-sm text-primary-t">{item.stock}</h3>
          <p className="text-[10px] text-primary-t/60">{item.name}</p>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <p className="text-sm font-semibold text-green-500">R${item.price}</p>
      </div>
    </li>
  );
}
