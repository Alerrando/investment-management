import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { initialStateStockProvider } from "@/lib/utils";
import { ListStockModel } from "@/models/Lists/ListStockModel";

import { getListStock } from "../../app/api/getListStock";

interface ListStocksState {
  dataListStocks: ListStockModel;
  setDataListStocks: (data: ListStockModel) => void;
}

const useListStocksStore = create<ListStocksState>()(
  persist(
    (set) => ({
      dataListStocks: initialStateStockProvider,
      setDataListStocks: (data) =>
        set({
          dataListStocks: data.content ? { ...data, content: data.content } : data,
        }),
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
      if (dataListStocks?.content?.length) return dataListStocks;

      const data = await getListStock();
      setDataListStocks(data.content ? { ...data, content: data.content } : data);

      return data;
    },
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60 * 24,
    onError: (err) => {
      console.error(err);
    },
    onSuccess: (data) => {
      setDataListStocks(data.content ? { ...data, content: data.content } : data);
    },
  });

  return { dataListStocks, isLoadingListStocks: isLoading, error };
}
