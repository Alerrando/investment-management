"use client";
import { motion } from "framer-motion";
import { BriefcaseBusiness, Search, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ListCryptoModel } from "@/models/Lists/ListCryptoModel";
import { ListFiisModelContent } from "@/models/Lists/ListFiisModel";
import { ListStockModelContent } from "@/models/Lists/ListStockModel";
import { useListCrypto } from "@/provider/Lists/ListCryptoProvider";
import { useListFiis } from "@/provider/Lists/ListFiisProvider";
import { useListStocks } from "@/provider/Lists/ListStockProvider";
import { useRecommendationCrypto } from "@/provider/Recommendation/RecommendationCryptoProvider";
import { useRecommendationFiis } from "@/provider/Recommendation/RecommendationFiisProvider";
import { useRecommendationStocks } from "@/provider/Recommendation/RecommendationStockProvider";

import BagContent from "./BagContent/BagContent";
import SkeletonAssetManagement from "./SkeletonAssetManagement/SkeletonAssetManagement";
import TableCrypto from "./TableCrypto/TableCrypto";
import TableFiis from "./TableFiis/TableFiis";
import TableStock from "./TableStock/TableStock";

interface AssetManagementProps {
  Ações: ListStockModelContent[];
  Fiis: ListFiisModelContent[];
  Cryptos: ListCryptoModel[];
  Bdrs: any[];
}

export interface BagProps {
  image?: string;
  name: string;
  marketValue: string;
  quantity: number;
  quotation: number;
  assets: keyof AssetManagementProps;
}

export interface QuantityState {
  [key: string]: number;
}

export default function AssetManagement() {
  const [activeTab, setActiveTab] = useState<keyof AssetManagementProps>("Ações");
  const [searchQuery, setSearchQuery] = useState("");
  const [bag, setBag] = useState<BagProps[]>([]);
  const [quantity, setQuantity] = useState<QuantityState>({});
  const [animatedIcon, setAnimatedIcon] = useState(false);
  const [showBag, setShowBag] = useState(false);
  const [showBagContent, setShowBagContent] = useState(false);
  const { dataListFiis } = useListFiis();
  const { dataListStocks } = useListStocks();
  const { dataListCrypto } = useListCrypto();
  const { mutateRecommendationStock, dataRecommendationStock } = useRecommendationStocks();
  const { mutateRecommendationFiis, dataRecommendationFiis } = useRecommendationFiis();
  const { mutateRecommendationCrypto, dataRecommendationCrypto } = useRecommendationCrypto();

  useEffect(() => {
    if (animatedIcon) {
      const timer = setTimeout(() => {
        setAnimatedIcon(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [animatedIcon]);

  useEffect(() => {
    if (showBag) {
      const timer = setTimeout(() => setShowBagContent(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [showBag]);

  console.log(dataListStocks?.content?.length === 0 || (dataListStocks?.content as any)?.content?.length === 0);

  return (
    <div className="flex w-full flex-col gap-6 py-6 pb-8">
      <div className="flex gap-4 border-b dark:border-gray-700">
        {["Ações", "Fiis", "Cryptos", "BDRs"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as keyof AssetManagementProps)}
            className={`px-4 py-2 transition-all duration-300 ${
              activeTab === tab
                ? "border-b-2 border-purple-600 font-semibold text-purple-600 dark:border-purple-400 dark:text-purple-400"
                : "text-primary-t/60 hover:text-primary-t"
            }`}
          >
            {tab}
          </button>
        ))}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="ml-auto flex items-center justify-end">
              <Sparkles
                size={24}
                className="cursor-pointer text-purple-600 dark:text-purple-400"
                onClick={() => recommendationsInvestment()}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Adicionar Recomendações</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-border/40 bg-foreground px-4 py-2 shadow-sm transition-all duration-300 hover:shadow-md">
        <Search size={18} className="text-primary-t" />
        <input
          type="text"
          placeholder={`Buscar ${activeTab}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-sm text-primary-t outline-none placeholder:text-primary-t/40"
        />
      </div>

      <div className="h-72 overflow-auto rounded-lg border border-border/40 bg-foreground shadow-sm">
        {activeTab === "Fiis" &&
        (dataListFiis?.content?.length > 0 || (dataListFiis?.content as any)?.content?.length > 0) ? (
          <TableFiis
            filteredAssets={
              !Array.isArray(dataListFiis.content)
                ? (dataListFiis?.content as any)?.content?.filter((asset: any) =>
                    asset.paper.toLowerCase().includes(searchQuery.toLowerCase()),
                  )
                : dataListFiis?.content?.filter((asset: any) =>
                    asset.paper.toLowerCase().includes(searchQuery.toLowerCase()),
                  )
            }
            handleAddToBag={handleAddToBag}
            dataRecommendationFiis={dataRecommendationFiis}
          />
        ) : activeTab === "Ações" &&
          (dataListStocks?.content?.length > 0 || (dataListStocks?.content as any)?.content?.length > 0) ? (
          <TableStock
            filteredAssets={
              !Array.isArray(dataListStocks.content)
                ? (dataListStocks?.content as any)?.content?.filter((asset: any) =>
                    asset.paper.toLowerCase().includes(searchQuery.toLowerCase()),
                  )
                : dataListStocks?.content?.filter((asset: any) =>
                    asset.paper.toLowerCase().includes(searchQuery.toLowerCase()),
                  )
            }
            handleAddToBag={handleAddToBag}
            dataRecommendationStock={dataRecommendationStock}
          />
        ) : activeTab === "Cryptos" && ((dataListCrypto as any)?.content?.length > 0 || dataListCrypto?.length > 0) ? (
          <TableCrypto
            filteredAssets={
              !Array.isArray(dataListCrypto)
                ? (dataListCrypto as any)?.content?.filter((asset: any) =>
                    asset.name.toLowerCase().includes(searchQuery.toLowerCase()),
                  )
                : dataListCrypto?.filter((asset: any) => asset.name.toLowerCase().includes(searchQuery.toLowerCase()))
            }
            handleAddToBag={handleAddToBag}
            dataRecommendationCrypto={dataRecommendationCrypto}
          />
        ) : (
          <SkeletonAssetManagement />
        )}
      </div>

      {!showBagContent && (
        <motion.div
          className={`fixed -right-2 top-1/3 z-30 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border bg-card p-2 shadow-lg hover:bg-primary`}
          onClick={() => setShowBag(!showBag)}
          animate={
            showBag
              ? {
                  x: [0, -75, 75, -0, 0, -0, 0],
                }
              : { x: [0, -0, 0, -0, 75, -75, 0] }
          }
          transition={{
            duration: 2.8,
            ease: ["easeIn", "easeOut"],
            damping: 3,
            stiffness: 50,
            restDelta: 0.001,
          }}
        >
          <BriefcaseBusiness size={18} className="text-primary-t" />
        </motion.div>
      )}

      {showBagContent && (
        <BagContent
          bag={bag}
          handleQuantityChange={handleQuantityChange}
          handleRemoveFromBag={handleRemoveFromBag}
          setShowBag={setShowBagContent}
          quantity={quantity}
        />
      )}
    </div>
  );

  function handleAddToBag(asset: ListCryptoModel | ListFiisModelContent | ListStockModelContent | any) {
    if (!bag.some((item) => item.name === asset.name || item.name === asset.paper)) {
      const aux: BagProps = {
        image: asset.image && asset.image,
        name: asset.name || asset.paper,
        marketValue: asset.marketValue
          ? asset.marketValue
          : (asset.marketCap.replace("$", "").replace("M", "") * 1000000).toString(),
        quantity: 1,
        assets: activeTab,
        quotation: asset.quotation ? parseFloat(asset.quotation) : asset.price,
      };
      setBag([...bag, aux]);
      setQuantity({ ...quantity, [aux.name]: 0 });
      setAnimatedIcon(true);
    }
  }

  async function recommendationsInvestment() {
    const auxStock = bag.filter((item) => item.assets === "Ações");
    const stocks = dataListStocks.content.filter((stock) => auxStock.some((item) => item.name === stock.paper));
    if (auxStock.length > 0) await mutateRecommendationStock(stocks as ListStockModelContent[]);

    const auxFiis = bag.filter((item) => item.assets === "Fiis");
    const fiis = dataListFiis.content.filter((fiis) => auxFiis.some((item) => item.name === fiis.paper));
    if (auxFiis.length > 0) await mutateRecommendationFiis(fiis as ListFiisModelContent[]);

    const auxCrypto = bag.filter((item) => item.assets === "Cryptos");
    const crypto = dataListCrypto.filter((crypto) => auxCrypto.some((item) => item.name === crypto.name));
    if (auxCrypto.length > 0) await mutateRecommendationCrypto(crypto as ListCryptoModel[]);
  }

  function handleRemoveFromBag(assetName: string) {
    setBag(bag.filter((item) => item.name !== assetName));
    const newQuantity = { ...quantity };
    setQuantity(newQuantity);
  }

  function handleQuantityChange(assetName: string, value: number) {
    setQuantity({ ...quantity, [assetName]: value });
  }
}
