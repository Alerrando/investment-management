import { useMutation } from "@tanstack/react-query";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { api, initialStateStockShareholdersDetails } from "@/lib/utils";
import { StockShareholdersModel } from "@/models/StockShareholdersModel";

interface StockShareHoldersDataDetailsState {
  stockShareholdersDetails: StockShareholdersModel;
  setStockShareholdersDetails: (data: StockShareholdersModel) => void;
}

const useStockShareholdersDetailsStore = create<StockShareHoldersDataDetailsState>()(
  persist(
    (set) => ({
      stockShareholdersDetails: initialStateStockShareholdersDetails,
      setStockShareholdersDetails: (data) => set({ stockShareholdersDetails: data }),
    }),
    {
      name: "stock-details-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ stockShareholdersDetails: state.stockShareholdersDetails }),
    },
  ),
);

export function useStockShareholdersDetails() {
  const { setStockShareholdersDetails, stockShareholdersDetails } = useStockShareholdersDetailsStore();

  const { mutateAsync: mutateStockShareholdersDetails, isLoading } = useMutation({
    mutationKey: ["stock-shareholders-details"],
    mutationFn: async (stock: string) => api.get(`/api/getStockShareholdersDataDetails?stock=${stock}`),
    cacheTime: 1000 * 60 * 60 * 24,
    onError: (err) => {
      console.error(err);
    },
    onSuccess: (response) => {
      setStockShareholdersDetails(response.data);
    },
  });

  return { mutateStockShareholdersDetails, stockShareholdersDetails, isLoadingListStocks: isLoading };
}
