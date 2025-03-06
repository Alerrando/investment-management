import { ChartCandlestick, Plus, Sparkles } from "lucide-react";

import { TableCell } from "@/components/ui/table";
import { ListCryptoModel } from "@/models/Lists/ListCryptoModel";
import { ListFiisModel } from "@/models/Lists/ListFiisModel";
import { ListStockModelContent } from "@/models/Lists/ListStockModel";

interface TableStockProps {
  filteredAssets: ListStockModelContent[];
  handleAddToBag: (asset: ListCryptoModel | ListFiisModel | ListStockModelContent | any) => void;
  dataRecommendationStock: ListStockModelContent[];
}

export default function TableStock({ filteredAssets, handleAddToBag, dataRecommendationStock }: TableStockProps) {
  const top5RecommendationStocks = dataRecommendationStock?.slice(0, 5);

  const filteredAssetsWithoutTop5Recommendations = filteredAssets?.filter(
    (asset) => !top5RecommendationStocks?.some((recAsset) => recAsset.paper === asset.paper),
  );

  return (
    <table className="w-full table-auto border-collapse text-left text-sm">
      <thead className="sticky top-0 z-10 bg-primary">
        <tr>
          <th className="py-3 pl-4 text-foreground">Nome</th>
          <th className="py-3 pl-4 text-foreground">Preço</th>
          <th className="py-3 pl-4 text-foreground">Dividendo Yield</th>
          <th className="py-3 pl-4 text-foreground">Valor de Mercado</th>
          <th className="py-3 pl-4 text-foreground">Ação</th>
        </tr>
      </thead>

      <tbody>
        {dataRecommendationStock?.length > 0 && (
          <>
            {dataRecommendationStock
              .filter((_, index) => index <= 5)
              .map((asset) => (
                <tr
                  key={asset.paper}
                  className="border-primary-80 relative border-b bg-card transition-all duration-300 hover:bg-skeleton"
                >
                  <TableCell className="pl-4">
                    <div className="flex h-full items-center justify-start gap-2">
                      <ChartCandlestick className="h-8 w-8 text-primary" />
                      <div className="flex h-full flex-col justify-between py-2">
                        <h2 className="text-[10px] text-primary">{asset.paper}</h2>
                      </div>
                    </div>
                  </TableCell>

                  <td className="px-4 py-3 text-primary">R$ {parseFloat(asset.quotation).toFixed(2)}</td>

                  <TableCell className="pl-4">
                    {asset.dividend && (
                      <div className="flex w-fit flex-col items-end text-primary">
                        <span>{asset.dividend}</span>
                      </div>
                    )}
                  </TableCell>

                  <TableCell className="pl-4">
                    {asset.marketValue && (
                      <div className="flex w-fit flex-col items-end text-primary">
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
          </>
        )}

        {filteredAssetsWithoutTop5Recommendations
          ?.filter((item, index, self) => index === self.findIndex((t) => t.paper === item.paper))
          ?.sort((a, b) => a.paper.localeCompare(b.paper))
          ?.map((asset) => (
            <tr
              key={asset.paper}
              className="border-primary-80 relative border-b bg-card transition-all duration-300 hover:bg-skeleton"
            >
              <TableCell className="pl-4">
                <div className="flex h-full items-center justify-start gap-2">
                  <ChartCandlestick className="h-8 w-8 text-primary" />
                  <div className="flex h-full flex-col justify-between py-2">
                    <h2 className="text-[10px] text-primary">{asset.paper}</h2>
                  </div>
                </div>
              </TableCell>

              <td className="py-3 pl-4 text-primary">R$ {parseFloat(asset.quotation).toFixed(2)}</td>

              <TableCell className="pl-4">
                {asset.dividend && (
                  <div className="flex w-fit flex-col items-end text-primary">
                    <span>{asset.dividend}</span>
                  </div>
                )}
              </TableCell>

              <TableCell className="pl-4">
                {asset.marketValue && (
                  <div className="flex w-fit flex-col items-end text-primary">
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
