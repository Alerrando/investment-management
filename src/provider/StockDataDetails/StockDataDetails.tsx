import { useMutation } from "@tanstack/react-query";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { api, initialStateStockDetails } from "@/lib/utils";
import { StockDetailsModel } from "@/models/StockDetailsModel";

interface StockDataDetailsState {
  stockDetails: StockDetailsModel;
  setStockDetails: (data: StockDetailsModel) => void;
  resetStockDetails: () => void;
}

const useStockDetailsStore = create<StockDataDetailsState>()(
  persist(
    (set) => ({
      stockDetails: initialStateStockDetails,
      setStockDetails: (data) => set({ stockDetails: data }),
      resetStockDetails: () => set({ stockDetails: initialStateStockDetails }),
    }),
    {
      name: "stock-details-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ stockDetails: state.stockDetails }),
    },
  ),
);

export function useStockDetails() {
  const { setStockDetails, stockDetails, resetStockDetails } = useStockDetailsStore();

  const { mutateAsync: mutateStockDetails, isLoading } = useMutation({
    mutationKey: (variables: string[]) => ["stock-details", variables[0]],
    mutationFn: async (stock: string) => api.get(`/api/getStockDataDetails?stock=${stock}`),
    cacheTime: 1000 * 60 * 60 * 24,
    onError: (err) => {
      console.error(err);
    },
    onSuccess: (response) => {
      setStockDetails(response.data);
    },
  });

  return { mutateStockDetails, stockDetails, isLoadingListStocks: isLoading, resetStockDetails };
}
