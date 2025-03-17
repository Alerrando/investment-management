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
    <table className="w-full table-auto border-collapse text-left text-sm">
      <thead className="sticky top-0 z-10 bg-primary">
        <tr>
          <th className="px-4 py-3 text-foreground">Nome</th>
          <th className="px-4 py-3 text-foreground">Preço</th>
          <th className="px-4 py-3 text-foreground">Dividendo Yield</th>
          <th className="px-4 py-3 text-foreground">Valor de Mercado</th>
          <th className="px-4 py-3 text-foreground">Ação</th>
        </tr>
      </thead>

      <tbody>
        {dataRecommendationFiis?.length > 0 &&
          dataRecommendationFiis.slice(0, 5).map((asset) => (
            <tr
              key={asset.paper}
              className="border-primary-80 relative border-b bg-card transition-all duration-300 hover:bg-skeleton"
            >
              <TableCell className="pl-4">
                <div className="flex h-full items-center justify-start gap-2">
                  <Building className="h-8 w-8 text-primary-t" />
                  <div className="flex h-full flex-col justify-between py-2">
                    <span className="text-[9px] text-primary-t/60">{asset.segment ?? ""}</span>

                    <h2 className="text-[10px] text-primary-t">{asset.paper}</h2>
                  </div>
                </div>
              </TableCell>

              <td className="px-4 py-3">R$ {asset.quotation.toFixed(2)}</td>

              <TableCell className="pl-4">
                {asset.dividend && (
                  <div className="flex w-fit flex-col items-end text-primary-t">
                    <span>{asset.dividend}</span>
                  </div>
                )}
              </TableCell>

              <TableCell className="pl-4">
                {asset.marketValue && (
                  <div className="flex w-fit flex-col items-end text-primary-t">
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
                  className="flex items-center gap-1 rounded-full bg-purple-600 px-3 py-1.5 text-sm text-foreground transition-all duration-300 hover:bg-purple-700"
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

        {filteredAssetsWithoutTop5Recommendations?.map((asset) => (
          <tr
            key={asset.paper}
            className="border-primary-80 relative border-b bg-card transition-all duration-300 hover:bg-skeleton"
          >
            <TableCell className="pl-4">
              <div className="flex h-full items-center justify-start gap-2">
                <Building className="h-8 w-8 text-primary-t" />
                <div className="flex h-full flex-col justify-between py-2">
                  <span className="text-[9px] text-primary-t/60">{asset.segment ?? ""}</span>
                  <h2 className="text-[10px] text-primary-t">{asset.paper}</h2>
                </div>
              </div>
            </TableCell>

            <td className="px-4 py-3">R$ {asset.quotation.toFixed(2)}</td>

            <TableCell className="pl-4">
              <div className="flex w-fit flex-col items-end text-primary-t">
                <span>{asset.dividend}</span>
              </div>
            </TableCell>

            <TableCell className="pl-4">
              <div className="flex w-fit flex-col items-end text-primary-t">
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
                className="flex items-center gap-1 rounded-full bg-purple-600 px-3 py-1.5 text-sm text-foreground transition-all duration-300 hover:bg-purple-700"
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
