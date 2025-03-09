import { Plus } from "lucide-react";

import { ListCryptoModel } from "@/models/Lists/ListCryptoModel";
import { ListFiisModel } from "@/models/Lists/ListFiisModel";
import { ListStockModel } from "@/models/Lists/ListStockModel";

interface TableCryptoProps {
  filteredAssets: ListCryptoModel[];
  handleAddToBag: (asset: ListCryptoModel | ListFiisModel | ListStockModel | any) => void;
  dataRecommendationCrypto: ListCryptoModel[];
}

export default function TableCrypto({ filteredAssets, handleAddToBag, dataRecommendationCrypto }: TableCryptoProps) {
  const top5RecommendationCrypto = dataRecommendationCrypto?.slice(0, 5);

  const filteredAssetsWithoutTop5Recommendations = filteredAssets?.filter(
    (asset) => !top5RecommendationCrypto?.some((recAsset) => recAsset.name === asset.name),
  );

  return (
    <table className="w-full table-auto border-collapse text-left text-sm">
      <thead className="sticky top-0 z-10 bg-primary">
        <tr>
          <th className="px-4 py-3 text-foreground">Nome</th>
          <th className="px-4 py-3 text-foreground">Preço</th>
          <th className="px-4 py-3 text-foreground">Ação</th>
        </tr>
      </thead>

      <tbody>
        {dataRecommendationCrypto?.length > 0 &&
          dataRecommendationCrypto.slice(0, 5).map((asset) => (
            <tr
              key={asset.name}
              className="border-primary-80 relative border-b bg-card transition-all duration-300 hover:bg-skeleton"
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <img src={asset.image} alt={asset.name} className="h-8 w-8 rounded-full" />
                  <div>
                    <p className="text-[10px] text-primary-t">{asset.name}</p>
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
                  className="flex items-center gap-1 rounded-full bg-purple-600 px-3 py-1.5 text-sm text-foreground transition-all duration-300 hover:bg-purple-700"
                >
                  <Plus size={14} />
                  Adicionar
                </button>
              </td>
            </tr>
          ))}

        {filteredAssetsWithoutTop5Recommendations?.map((asset, index) => (
          <tr
            key={index}
            className="border-primary-80 relative border-b bg-card transition-all duration-300 hover:bg-skeleton"
          >
            <td className="px-4 py-3">
              <div className="flex items-center gap-2">
                <img src={asset.image} alt={asset.name} className="h-8 w-8 rounded-full" />
                <div>
                  <p className="text-[10px] text-primary-t">{asset.name}</p>
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
