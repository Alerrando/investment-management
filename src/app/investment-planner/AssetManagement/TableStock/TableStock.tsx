import { ChartCandlestick, Plus } from "lucide-react";

import { TableCell } from "@/components/ui/table";
import { ListCryptoModel } from "@/models/Lists/ListCryptoModel";
import { ListFiisModel } from "@/models/Lists/ListFiisModel";
import { ListStockModelContent } from "@/models/Lists/ListStockModel";

interface TableStockProps {
  filteredAssets: ListStockModelContent[];
  handleAddToBag: (asset: ListCryptoModel | ListFiisModel | ListStockModelContent | any) => void;
}

export default function TableStock({ filteredAssets, handleAddToBag }: TableStockProps) {
  return (
    <table className="w-full table-auto border-collapse text-left text-sm text-gray-600 dark:text-gray-300">
      <thead className="sticky top-0 bg-gray-100 dark:bg-gray-800">
        <tr>
          <th className="px-4 py-3">Nome</th>
          <th className="px-4 py-3">Preço</th>
          <th className="px-4 py-3">Dividendo Yield</th>
          <th className="px-4 py-3">Valor de Mercado</th>
          <th className="px-4 py-3">Ação</th>
        </tr>
      </thead>

      <tbody>
        {filteredAssets
          ?.filter((item, index, self) => index === self.findIndex((t) => t.paper === item.paper))
          ?.sort((a, b) => a.paper.localeCompare(b.paper))
          ?.map((asset) => (
            <tr
              key={asset.paper}
              className="border-b transition-all duration-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <TableCell>
                <div className="flex h-full items-center justify-start gap-2">
                  <ChartCandlestick className="h-8 w-8" />
                  <div className="flex h-full flex-col justify-between py-2">
                    <h2 className="text-[10px]">{asset.paper}</h2>
                  </div>
                </div>
              </TableCell>

              <td className="px-4 py-3">R$ {parseFloat(asset.quotation).toFixed(2)}</td>

              <TableCell>
                {asset.dividend && (
                  <div className="flex w-fit flex-col items-end">
                    <span>{asset.dividend}</span>
                  </div>
                )}
              </TableCell>

              <TableCell>
                {asset.marketValue && (
                  <div className="flex w-fit flex-col items-end">
                    <span>
                      {asset.marketValue.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </div>
                )}
              </TableCell>

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
