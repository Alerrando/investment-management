import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { getListStock } from "@/api/getListStock";
import { initialStateStockProvider } from "@/lib/utils";
import { ListStockModel } from "@/models/Lists/ListStockModel";

interface ListStocksState {
  dataListStocks: ListStockModel;
  setDataListStocks: (data: ListStockModel) => void;
}

const useListStocksStore = create<ListStocksState>()(
  persist(
    (set) => ({
      dataListStocks: initialStateStockProvider,
      setDataListStocks: (data) => set({ dataListStocks: data }),
    }),
    {
      name: "listStocks-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ dataListStocks: state.dataListStocks }),
    },
  ),
);

export function useListStocks() {
  const { setDataListStocks, dataListStocks } = useListStocksStore();

  const { isLoading, error } = useQuery({
    queryKey: ["list-stocks"],
    queryFn: async () => {
      if (dataListStocks?.content?.length) return { content: dataListStocks };

      const data = await getListStock();
      setDataListStocks(data);
      return data;
    },
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60 * 24,
    onError: (err) => {
      console.error(err);
    },
    onSuccess: (data) => {
      setDataListStocks(data);
    },
  });

  return { dataListStocks, isLoadingListStocks: isLoading, error };
}
