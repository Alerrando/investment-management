import { useMutation } from "@tanstack/react-query";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { initialStateStockDetails } from "@/lib/utils";
import { StockDetailsModel } from "@/models/StockDetailsModel";

import getStockDetails from "./rss";

interface StockDataDetailsState {
  stockDetails: StockDetailsModel;
  setStockDetails: (data: StockDetailsModel) => void;
}

const useStockDetailsStore = create<StockDataDetailsState>()(
  persist(
    (set) => ({
      stockDetails: initialStateStockDetails,
      setStockDetails: (data) => set({ stockDetails: data }),
    }),
    {
      name: "stock-details-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ stockDetails: state.stockDetails }),
    },
  ),
);

export function useStockDetails() {
  const { setStockDetails, stockDetails } = useStockDetailsStore();

  const { mutateAsync: mutateStockDetails, isLoading } = useMutation({
    mutationKey: ["stock-details"],
    mutationFn: (stock: string) => getStockDetails(stock),
    cacheTime: 1000 * 60 * 60 * 24,
    onError: (err) => {
      console.error(err);
    },
    onSuccess: (data) => {
      setStockDetails(data as StockDetailsModel);
    },
  });

  return { mutateStockDetails, stockDetails, isLoadingListStocks: isLoading };
}
