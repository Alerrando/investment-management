import { useMutation } from "@tanstack/react-query";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import handler from "@/api/rss";
import { initialStateStockDetails } from "@/lib/utils";
import { StockDetailsModel } from "@/models/StockDetailsModel";

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
      name: "listStocks-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ stockDetails: state.stockDetails }),
    },
  ),
);

export function useStockDetails() {
  const { setStockDetails, stockDetails } = useStockDetailsStore();

  const { mutateAsync: mutateStockDetails, isLoading } = useMutation({
    mutationKey: ["stock-details"],
    mutationFn: (stock: string) => handler(stock),
    cacheTime: 1000 * 60 * 60 * 24,
    onError: (err) => {
      console.error(err);
    },
    onSuccess: (data) => {
      setStockDetails(data);
    },
  });

  return { mutateStockDetails, stockDetails, isLoadingListStocks: isLoading };
}
