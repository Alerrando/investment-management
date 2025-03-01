import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { getListStockByMarketValue } from "@/api/getListStockByMarketValue";
import { initialStateStockProvider } from "@/lib/utils";
import { ListStockModel } from "@/models/Lists/ListStockModel";

interface ListStocksByMarketValueState {
  dataListStocksByMarketValue: ListStockModel;
  setDataListStocksByMarketValue: (data: ListStockModel) => void;
}

const useListStocksByMarketValueStore = create<ListStocksByMarketValueState>()(
  persist(
    (set) => ({
      dataListStocksByMarketValue: initialStateStockProvider,
      setDataListStocksByMarketValue: (data) => set({ dataListStocksByMarketValue: data }),
    }),
    {
      name: "list-stocks-by-market-value-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ dataListStocksByMarketValue: state.dataListStocksByMarketValue }),
    },
  ),
);

export function useListStocksByMarketValue() {
  const { setDataListStocksByMarketValue, dataListStocksByMarketValue } = useListStocksByMarketValueStore();

  const { isLoading, error } = useQuery({
    queryKey: ["list-stocks-by-market-value"],
    queryFn: async () => {
      if (dataListStocksByMarketValue?.content?.length) return { content: dataListStocksByMarketValue };

      const data = await getListStockByMarketValue();
      setDataListStocksByMarketValue(data);
      return data;
    },
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60 * 24,
    onError: (err) => {
      console.error(err);
    },
    onSuccess: (data) => {
      setDataListStocksByMarketValue(data);
    },
  });

  return { dataListStocksByMarketValue: dataListStocksByMarketValue, isLoadingByMarketValue: isLoading, error };
}
