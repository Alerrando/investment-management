import { Plus } from "lucide-react";

import { ListCryptoModel } from "@/models/Lists/ListCryptoModel";
import { ListFiisModel } from "@/models/Lists/ListFiisModel";
import { ListStockModel } from "@/models/Lists/ListStockModel";

interface TableCryptoProps {
  filteredAssets: ListCryptoModel[];
  handleAddToBag: (asset: ListCryptoModel[] | ListFiisModel[] | ListStockModel[] | any[]) => void;
}

export default function TableCrypto({ filteredAssets, handleAddToBag }: TableCryptoProps) {
  console.log(filteredAssets);

  return (
    <table className="w-full table-auto border-collapse text-left text-sm text-gray-600 dark:text-gray-300">
      <thead className="sticky top-0 bg-gray-100 dark:bg-gray-800">
        <tr>
          <th className="px-4 py-3">Nome</th>
          <th className="px-4 py-3">Preço</th>
          <th className="px-4 py-3">Ação</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
        {filteredAssets
          ?.filter((_, index) => index < 20)
          ?.map((asset, index) => (
            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <img src={asset.image} alt={asset.name} className="h-8 w-8 rounded-full" />
                  <div>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">{asset.name}</p>
                  </div>
                </div>
              </td>

              <td className="px-4 py-3">
                <div className="flex flex-col items-start">
                  <p className="text-sm font-semibold text-green-500">R${asset.price}</p>
                </div>
              </td>

              <td className="px-4 py-3">
                <button
                  onClick={() => handleAddToBag(asset)}
                  className="flex items-center gap-1 rounded-full bg-purple-600 px-3 py-1.5 text-sm text-white transition-all duration-300 hover:bg-purple-700"
                >
                  <Plus size={14} />
                  Adicionar
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
