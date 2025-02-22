import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { getListStock } from "@/api/getListStock";
import { ListStockModelContent } from "@/models/Lists/ListStockModel";

interface ListStocksByDividendState {
  dataListStocksByDividend: ListStockModelContent[];
  setDataListStocksByDividend: (data: ListStockModelContent[]) => void;
}

const useListStocksByDividendStore = create<ListStocksByDividendState>()(
  persist(
    (set) => ({
      dataListStocksByDividend: [],
      setDataListStocksByDividend: (data) => set({ dataListStocksByDividend: data }),
    }),
    {
      name: "list-stocks-by-dividend-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export function useListStocksByDividend() {
  const { setDataListStocksByDividend, dataListStocksByDividend } = useListStocksByDividendStore();

  const { isLoading, error } = useQuery({
    queryKey: ["list-stocks"],
    queryFn: async () => {
      if (dataListStocksByDividend?.length) return { content: dataListStocksByDividend };

      const data = await getListStock();
      setDataListStocksByDividend(data.content);
      return data.content;
    },
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60 * 24,
    onError: (err) => {
      console.error(err);
    },
    onSuccess: (data) => {
      setDataListStocksByDividend(data);
    },
  });

  return { dataListStocksByDividend: dataListStocksByDividend, isLoadingListStocks: isLoading, error };
}
