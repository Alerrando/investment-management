import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { getListStock } from "@/api/getListStock";
import { ListStockModelContent } from "@/models/Lists/ListStockModel";

interface ListStocksState {
  dataListStocks: ListStockModelContent[];
  setDataListStocks: (data: ListStockModelContent[]) => void;
}

const useListStocksStore = create<ListStocksState>()(
  persist(
    (set) => ({
      dataListStocks: [],
      setDataListStocks: (data) => set({ dataListStocks: data }),
    }),
    {
      name: "listStocks-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export function useListStocks() {
  const { setDataListStocks, dataListStocks } = useListStocksStore();

  const { isLoading, error } = useQuery({
    queryKey: ["list-stocks"],
    queryFn: async () => {
      if (dataListStocks?.length) return { content: dataListStocks.content };

      const data = await getListStock();
      setDataListStocks(data.content);
      return data.content;
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

  return { dataListStocks: dataListStocks, isLoadingListStocks: isLoading, error };
}
