import { Building, Plus, Sparkles } from "lucide-react";

import { TableCell } from "@/components/ui/table";
import { ListCryptoModel } from "@/models/Lists/ListCryptoModel";
import { ListFiisModelContent } from "@/models/Lists/ListFiisModel";
import { ListStockModel } from "@/models/Lists/ListStockModel";

interface TableFiisProps {
  filteredAssets: ListFiisModelContent[];
  handleAddToBag: (asset: ListCryptoModel | ListFiisModelContent | ListStockModel | any) => void;
  dataRecommendationFiis: ListFiisModelContent[];
}

export default function TableFiis({ filteredAssets, handleAddToBag, dataRecommendationFiis }: TableFiisProps) {
  const top5RecommendationFiis = dataRecommendationFiis?.slice(0, 5);

  const filteredAssetsWithoutTop5Recommendations = filteredAssets?.filter(
    (asset) => !top5RecommendationFiis?.some((recAsset) => recAsset.paper === asset.paper),
  );

  return (
    <table className="w-full table-auto border-collapse text-left text-sm text-gray-600 dark:text-gray-300">
      <thead className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-800">
        <tr>
          <th className="px-4 py-3">Nome</th>
          <th className="px-4 py-3">Preço</th>
          <th className="px-4 py-3">Dividendo Yield</th>
          <th className="px-4 py-3">Valor de Mercado</th>
          <th className="px-4 py-3">Ação</th>
        </tr>
      </thead>

      <tbody>
        {dataRecommendationFiis?.length > 0 &&
          dataRecommendationFiis.slice(0, 5).map((asset) => (
            <tr
              key={asset.paper}
              className="relative border-b transition-all duration-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <TableCell className="pl-4">
                <div className="flex h-full items-center justify-start gap-2">
                  <Building className="h-8 w-8" />
                  <div className="flex h-full flex-col justify-between py-2">
                    <h2 className="text-[10px]">{asset.paper}</h2>
                  </div>
                </div>
              </TableCell>

              <td className="px-4 py-3">R$ {parseFloat(asset.quotation).toFixed(2)}</td>

              <TableCell className="pl-4">
                {asset.dividend && (
                  <div className="flex w-fit flex-col items-end">
                    <span>{asset.dividend}</span>
                  </div>
                )}
              </TableCell>

              <TableCell className="pl-4">
                {asset.marketValue && (
                  <div className="flex w-fit flex-col items-end">
                    <span>
                      {parseFloat(asset.marketValue).toLocaleString("pt-BR", {
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

              <TableCell className="absolute right-[1%] top-[15%] text-purple-600">
                <Sparkles size={24} />
              </TableCell>
            </tr>
          ))}

        {/* Exibe os Fiis restantes */}
        {filteredAssetsWithoutTop5Recommendations?.map((asset) => (
          <tr
            key={asset.paper}
            className="border-b transition-all duration-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <TableCell className="pl-4">
              <div className="flex h-full items-center justify-start gap-2">
                <Building className="h-8 w-8" />
                <div className="flex h-full flex-col justify-between py-2">
                  <span className="text-[9px] text-black/60">{asset.segment ?? ""}</span>
                  <h2 className="text-[10px]">{asset.paper}</h2>
                </div>
              </div>
            </TableCell>

            <td className="px-4 py-3">R$ {asset.quotation.toFixed(2)}</td>

            <TableCell className="pl-4">
              <div className="flex w-fit flex-col items-end">
                <span>{asset.dividend}</span>
              </div>
            </TableCell>

            <TableCell className="pl-4">
              <div className="flex w-fit flex-col items-end">
                <span>
                  {asset.marketValue.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
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
