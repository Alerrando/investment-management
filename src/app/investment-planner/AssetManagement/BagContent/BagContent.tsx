import { motion } from "framer-motion";
import { BriefcaseBusiness, ChartCandlestick, MinusCircle, Plus, Trash, X } from "lucide-react";

import { BagProps } from "../AssetManagement";

interface BagContentProps {
  setShowBag: (showBag: boolean) => void;
  bag: BagProps[];
  handleQuantityChange: (assetName: string, value: number) => void;
  handleRemoveFromBag: (assetName: string) => void;
}

export default function BagContent({ bag, handleQuantityChange, handleRemoveFromBag, setShowBag }: BagContentProps) {
  return (
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
                      {asset.quotation.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </p>
                </div>
              </div>

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
                        handleQuantityChange(asset.name, parseFloat(value));
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
  );
}
