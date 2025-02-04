"use client";
import { motion } from "framer-motion";
import { BriefcaseBusiness, ChartCandlestick, MinusCircle, Plus, Search, Trash, X } from "lucide-react";
import { useEffect, useState } from "react";

import { getListCrypto } from "@/api/getListCryptos";
import { getListFiis } from "@/api/getListFiis";
import { getListStock } from "@/api/getListStock";
import { useQueryHook } from "@/hook/useQueryHook";
import { ListCryptoModel } from "@/models/Lists/ListCryptoModel";
import { ListFiisModel, ListFiisModelContent } from "@/models/Lists/ListFiisModel";
import { ListStockModel, ListStockModelContent } from "@/models/Lists/ListStockModel";

import TableCrypto from "./TableCrypto/TableCrypto";
import TableFiis from "./TableFiis/TableFiis";
import TableStock from "./TableStock/TableStock";

interface AssetManagementProps {
  Ações: ListStockModelContent[];
  Fiis: ListFiisModelContent[];
  Cryptos: ListCryptoModel[];
  Bdrs: any[];
}

interface BagProps {
  image?: string;
  name: string;
  marketValue: string;
  quantity: number;
  quotation: number;
  assets: keyof AssetManagementProps;
}
export default function AssetManagement() {
  const [activeTab, setActiveTab] = useState<keyof AssetManagementProps>("Ações");
  const [searchQuery, setSearchQuery] = useState("");
  const [bag, setBag] = useState<BagProps[]>([]);
  const [quantity, setQuantity] = useState({});
  const [animatedIcon, setAnimatedIcon] = useState(false);
  const [showBag, setShowBag] = useState(false);
  const [showBagContent, setShowBagContent] = useState(false);
  const [assetsData, setAssetsData] = useState<AssetManagementProps>({} as AssetManagementProps);
  const { isLoading: isLoadingListFiis } = useQueryHook<ListFiisModel>({
    queryKey: ["query-list-fiis"],
    options: {
      queryFn: () => getListFiis(),
      staleTime: Infinity,
      cacheTime: Infinity,
      onSuccess: (data) => {
        setAssetsData((prevData) => ({
          ...prevData,
          Fiis: data.content,
        }));
      },
      onError: (error) => {
        console.error("Erro ao carregar dados de FIIs:", error);
      },
    },
  });

  const { isLoading: isLoadingListStocks } = useQueryHook<ListStockModel>({
    queryKey: ["query-list-stocks"],
    options: {
      queryFn: () => getListStock(),
      staleTime: Infinity,
      cacheTime: Infinity,
      onSuccess: (data) => {
        setAssetsData((prevData) => ({
          ...prevData,
          Ações: data.content,
        }));
      },
      onError: (error) => {
        console.error("Erro ao carregar dados de Ações:", error);
      },
    },
  });

  const { isLoading: isLoadingListCrypto } = useQueryHook({
    queryKey: ["query-list-crypto"],
    options: {
      queryFn: () => getListCrypto(),
      staleTime: Infinity,
      cacheTime: Infinity,
      onSuccess(data: ListCryptoModel[]) {
        setAssetsData((prevData) => ({
          ...prevData,
          Cryptos: data,
        }));
      },
      onError(err) {
        console.log(err);
      },
    },
  });

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

  const filteredAssets: ListCryptoModel[] | ListFiisModelContent[] | ListStockModelContent[] | any[] = assetsData[
    activeTab as keyof AssetManagementProps
  ]?.filter((asset) =>
    asset.name
      ? asset.name.toLowerCase().includes(searchQuery.toLowerCase())
      : asset.paper.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  console.log(assetsData);

  const handleAddToBag = (asset: ListCryptoModel | ListFiisModelContent | ListStockModelContent | any) => {
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
  };

  const handleRemoveFromBag = (assetName: string) => {
    setBag(bag.filter((item) => item.name !== assetName));
    const newQuantity = { ...quantity };
    setQuantity(newQuantity);
  };

  const handleQuantityChange = (assetName: string, value: number) => {
    setQuantity({ ...quantity, [assetName]: value });
  };

  return (
    <div className="flex w-full flex-col gap-6 py-6 dark:bg-gray-900 dark:text-white">
      <div className="flex gap-4 border-b dark:border-gray-700">
        {["Ações", "Fiis", "Cryptos", "BDRs"].map((tab) => (
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

      <div className="h-72 overflow-auto rounded-lg border border-gray-300 shadow-sm dark:border-gray-700">
        {!isLoadingListFiis && activeTab === "Fiis" ? (
          <TableFiis filteredAssets={filteredAssets as ListFiisModelContent[]} handleAddToBag={handleAddToBag} />
        ) : !isLoadingListStocks && activeTab === "Ações" ? (
          <TableStock filteredAssets={filteredAssets as ListStockModelContent[]} handleAddToBag={handleAddToBag} />
        ) : !isLoadingListCrypto && activeTab === "Cryptos" ? (
          <TableCrypto filteredAssets={filteredAssets as ListCryptoModel[]} handleAddToBag={handleAddToBag} />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div
              className="text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
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
          className="hover:shadow-3xl fixed right-4 top-1/3 z-30 flex h-[420px] w-96 flex-col gap-4 rounded-2xl border-2 border-gray-200 bg-white p-5 shadow-2xl transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
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
            <div className="flex h-full flex-col gap-3 overflow-y-auto">
              {bag.map((asset) => (
                <div
                  key={asset.name}
                  className="group relative flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 transition-all duration-300 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${!asset.image && "bg-purple-100 dark:bg-purple-900"}`}
                    >
                      {asset.image ? (
                        <img src={asset.image} alt={asset.name} className="h-full w-full rounded-full object-cover" />
                      ) : asset.assets === "Fiis" ? (
                        <BriefcaseBusiness size={18} className="text-purple-600 dark:text-purple-400" />
                      ) : (
                        <ChartCandlestick size={18} className="text-purple-600 dark:text-purple-400" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{asset.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Valor:{" "}
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                          {parseFloat(asset.quotation).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Controle de quantidade e remoção */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleQuantityChange(asset.name, Math.max((quantity[asset.name] || 0) - 1, 0))}
                        className="rounded-full bg-gray-200 p-1 text-gray-700 transition-all duration-300 hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                      >
                        <MinusCircle size={12} />
                      </button>
                      <input
                        type="text"
                        value={quantity[asset.name] || 0}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d+$/.test(value) || value === "") {
                            handleQuantityChange(asset.name, value);
                          }
                        }}
                        className="w-6 appearance-none rounded-lg border border-gray-300 bg-transparent py-1 text-center text-xs text-gray-700 transition-all duration-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-600 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-purple-400 dark:focus:ring-purple-400"
                      />
                      <button
                        onClick={() => handleQuantityChange(asset.name, (quantity[asset.name] || 0) + 1)}
                        className="rounded-full bg-gray-200 p-1 text-gray-700 transition-all duration-300 hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveFromBag(asset.name)}
                      className="rounded-full bg-red-100 p-1 text-red-600 transition-all duration-300 hover:bg-red-200 dark:bg-red-900 dark:text-red-400 dark:hover:bg-red-800"
                    >
                      <Trash size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {bag.length > 0 && (
            <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Total:{" "}
                <span className="text-purple-600 dark:text-purple-400">
                  {bag
                    .reduce((total, asset) => total + asset.quotation * (quantity[asset.name] || 0), 0)
                    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </span>
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
