"use client";
import { motion } from "framer-motion";
import { BriefcaseBusiness, Plus, Search, Trash } from "lucide-react";
import { useEffect, useState } from "react";

import { Table } from "@/components/ui/table";

export default function AssetManagement() {
  const [activeTab, setActiveTab] = useState("Ações");
  const [searchQuery, setSearchQuery] = useState("");
  const [bag, setBag] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [animatedIcon, setAnimatedIcon] = useState(false);
  const [showBag, setShowBag] = useState(false);
  const [showBagContent, setShowBagContent] = useState(false);

  const assetsData = {
    Ações: [
      { id: 1, name: "PETR4", price: 28.5 },
      { id: 2, name: "VALE3", price: 68.9 },
      { id: 3, name: "ITUB4", price: 22.1 },
    ],
    FIIs: [
      { id: 4, name: "XPML11", price: 100.0 },
      { id: 5, name: "HGLG11", price: 150.0 },
      { id: 6, name: "KNRI11", price: 120.0 },
    ],
    Crypto: [
      { id: 7, name: "BTC", price: 30000 },
      { id: 8, name: "ETH", price: 2000 },
      { id: 9, name: "ADA", price: 0.5 },
    ],
    BDRs: [
      { id: 10, name: "AMZO34", price: 50.0 },
      { id: 11, name: "TSLA34", price: 70.0 },
      { id: 12, name: "AAPL34", price: 60.0 },
    ],
  };

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

  const filteredAssets = assetsData[activeTab].filter((asset) =>
    asset.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleAddToBag = (asset) => {
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
    <div className="flex w-full flex-col gap-6 p-6 dark:bg-gray-900 dark:text-white">
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

      <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm dark:border-gray-700">
        <Table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Preço</th>
              <th className="px-4 py-3">Ação</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.map((asset) => (
              <tr
                key={asset.id}
                className="border-b transition-all duration-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                <td className="px-4 py-3 font-medium">{asset.name}</td>
                <td className="px-4 py-3">R$ {asset.price.toFixed(2)}</td>
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
        </Table>
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
          className="fixed right-4 top-1/3 z-30 h-[420px] w-72 rounded-lg border border-gray-200 bg-white p-4 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: ["easeIn", "easeOut"] }}
        >
          <h3 className="mb-4 text-lg font-bold text-purple-600 dark:text-purple-400">Minha Bag</h3>
          {bag.length === 0 ? (
            <p className="text-sm text-gray-600 dark:text-gray-400">Nenhum ativo adicionado.</p>
          ) : (
            <div className="no-scrollbar max-h-80 space-y-3 overflow-y-auto">
              {bag.map((asset) => (
                <div
                  key={asset.id}
                  className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{asset.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">R$ {asset.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={quantity[asset.id] || 0}
                      onChange={(e) => handleQuantityChange(asset.id, e.target.value)}
                      className="w-20 rounded-lg border border-gray-300 px-2 py-1 text-sm transition-all duration-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-600 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-purple-400 dark:focus:ring-purple-400"
                      min="0"
                    />
                    <button
                      onClick={() => handleRemoveFromBag(asset.id)}
                      className="rounded-full bg-red-600 p-1.5 text-sm text-white transition-all duration-300 hover:bg-red-700"
                    >
                      <Trash size={14} />
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
