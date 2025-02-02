"use client";
import { motion } from "framer-motion";
import { BriefcaseBusiness, Search, Trash, X } from "lucide-react";
import { useEffect, useState } from "react";

import { getListFiis } from "@/api/getListFiis";
import { getListStock } from "@/api/getListStock";
import { useQueryHook } from "@/hook/useQueryHook";
import { ListCryptoModel } from "@/models/Lists/ListCryptoModel";
import { ListFiisModel } from "@/models/Lists/ListsFiisModel";
import { ListStockModel } from "@/models/Lists/ListsStockModel";

import TableFiis from "./TableFiis/TableFiis";
import TableStock from "./TableStock/TableStock";

interface AssetManagementProps {
  Ações: ListStockModel[];
  Fiis: ListFiisModel[];
  Cryptos: ListCryptoModel[];
  Bdrs: any[];
}

export default function AssetManagement() {
  const [activeTab, setActiveTab] = useState("Ações");
  const [searchQuery, setSearchQuery] = useState("");
  const [bag, setBag] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [animatedIcon, setAnimatedIcon] = useState(false);
  const [showBag, setShowBag] = useState(false);
  const [showBagContent, setShowBagContent] = useState(false);
  const { data: dataListFiis, isLoading: isLoadingListFiis } = useQueryHook({
    queryKey: ["query-list-fiis"],
    options: {
      queryFn: () => getListFiis(),
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  });
  const { data: dataListStocks, isLoading: isLoadingListStocks } = useQueryHook({
    queryKey: ["query-list-stocks"],
    options: {
      queryFn: () => getListStock(),
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  });

  const [assetsData, setAssetsData] = useState<AssetManagementProps>({});

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
    } else {
      setShowBagContent(false);
    }
  }, [showBag]);

  useEffect(() => {
    if (!isLoadingListFiis) {
      setAssetsData({ ...assetsData, FIIs: dataListFiis.content });
    }
  }, [isLoadingListFiis]);

  useEffect(() => {
    if (!isLoadingListStocks) {
      console.log(dataListStocks, isLoadingListStocks);
      setAssetsData({ ...assetsData, Ações: dataListStocks.content });
    }
  }, [isLoadingListStocks]);

  const filteredAssets: ListCryptoModel[] | ListFiisModel[] | ListStockModel[] | any[] = assetsData[
    activeTab as keyof AssetManagementProps
  ]?.filter((asset) => asset.paper.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleAddToBag = (asset: ListCryptoModel | ListFiisModel | ListStockModel | any) => {
    if (!bag.some((item) => item.id === asset.id)) {
      setBag([...bag, asset]);
      setQuantity({ ...quantity, [asset.id]: 0 });
      setAnimatedIcon(true);
    }
  };

  const handleRemoveFromBag = (assetId) => {
    setBag(bag.filter((item) => item.id !== assetId));
    const newQuantity = { ...quantity };
    delete newQuantity[assetId];
    setQuantity(newQuantity);
  };

  const handleQuantityChange = (assetId, value) => {
    setQuantity({ ...quantity, [assetId]: value });
  };

  return (
    <div className="flex w-full flex-col gap-6 py-6 dark:bg-gray-900 dark:text-white">
      <div className="flex gap-4 border-b dark:border-gray-700">
        {["Ações", "FIIs", "Crypto", "BDRs"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 transition-all duration-300 ${
              activeTab === tab
                ? "border-b-2 border-purple-600 font-semibold text-purple-600 dark:border-purple-400 dark:text-purple-400"
                : "text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
        <Search size={18} className="text-gray-600 dark:text-gray-400" />
        <input
          type="text"
          placeholder={`Buscar ${activeTab}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400 dark:text-gray-300 dark:placeholder:text-gray-500"
        />
      </div>

      <div className="flex h-72 items-center justify-center overflow-auto rounded-lg border border-gray-300 shadow-sm dark:border-gray-700">
        {!isLoadingListFiis && activeTab === "Fiis" ? (
          <TableFiis filteredAssets={filteredAssets as ListFiisModel[]} handleAddToBag={handleAddToBag} />
        ) : !isLoadingListStocks && activeTab === "Ações" ? (
          <TableStock filteredAssets={filteredAssets as ListStockModel[]} handleAddToBag={handleAddToBag} />
        ) : (
          <div
            className="text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        )}
      </div>

      {!showBagContent && (
        <motion.div
          className={`fixed -right-2 top-1/3 z-30 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border bg-white p-2 shadow-lg hover:bg-zinc-100 dark:bg-gray-800 dark:hover:bg-gray-700`}
          onClick={() => setShowBag(!showBag)}
          animate={
            (animatedIcon
              ? {
                  y: [0, -5, 0, -5, 0, -5, 0],
                  scale: [1, 1.1, 1],
                }
              : { y: 0, scale: 1 },
            showBag
              ? {
                  x: [0, -75, 75, -0, 0, -0, 0],
                }
              : { x: 0, scale: 1 })
          }
          transition={{
            duration: 2.8,
            ease: ["easeIn", "easeOut"],
            damping: 3,
            stiffness: 50,
            restDelta: 0.001,
          }}
        >
          <BriefcaseBusiness size={18} />
        </motion.div>
      )}

      {showBagContent && (
        <motion.div
          className="fixed right-4 top-1/3 z-30 flex h-[420px] w-80 flex-col gap-6 rounded-2xl border-2 border-gray-200 bg-white p-5 shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: ["easeIn", "easeOut"] }}
        >
          <header className="flex w-full items-center justify-between">
            <h3 className="text-lg font-bold text-purple-600 dark:text-purple-400">Minha Bag</h3>
            <X
              size={20}
              className="cursor-pointer text-gray-600 transition-colors hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={() => setShowBag(false)}
            />
          </header>

          {bag.length === 0 ? (
            <p className="text-sm text-gray-600 dark:text-gray-400">Nenhum ativo adicionado.</p>
          ) : (
            <div className="no-scrollbar max-h-[300px] space-y-4 overflow-y-auto">
              {bag.map((asset) => (
                <div
                  key={asset.id}
                  className="flex items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <BriefcaseBusiness size={18} className="text-purple-600 dark:text-purple-400" />
                    <div>
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{asset.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">R$ {asset.price.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={quantity[asset.id] || 0}
                      onChange={(e) => handleQuantityChange(asset.id, e.target.value)}
                      className="w-16 rounded-lg border border-gray-300 bg-transparent px-2 py-1 text-sm text-gray-700 transition-all duration-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-600 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-purple-400 dark:focus:ring-purple-400"
                      min="0"
                    />
                    <button
                      onClick={() => handleRemoveFromBag(asset.id)}
                      className="rounded-full bg-red-600 p-2 text-sm text-white transition-all duration-300 hover:bg-red-700"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
