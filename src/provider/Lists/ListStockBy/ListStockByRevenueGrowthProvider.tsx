import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { initialStateStockProvider } from "@/lib/utils";
import { ListStockModel } from "@/models/Lists/ListStockModel";

import { getListStockByMarketValueRevenueGrowth } from "../../../app/api/getListStockByRevenueGrowth";

interface ListStocksByRevenueGrowthState {
  dataListStocksByRevenueGrowth: ListStockModel;
  setDataListStocksByRevenueGrowth: (data: ListStockModel) => void;
}

const useListStocksByRevenueGrowthStore = create<ListStocksByRevenueGrowthState>()(
  persist(
    (set) => ({
      dataListStocksByRevenueGrowth: initialStateStockProvider,
      setDataListStocksByRevenueGrowth: (data) => set({ dataListStocksByRevenueGrowth: data }),
    }),
    {
      name: "list-stocks-by-revenue-growth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ dataListStocksByRevenueGrowth: state.dataListStocksByRevenueGrowth }),
    },
  ),
);

export function useListStocksByRevenueGrowth() {
  const { setDataListStocksByRevenueGrowth, dataListStocksByRevenueGrowth } = useListStocksByRevenueGrowthStore();

  const { isLoading, error } = useQuery({
    queryKey: ["list-stocks-by-revenue-growth"],
    queryFn: async () => {
      if (dataListStocksByRevenueGrowth?.content?.length) return { content: dataListStocksByRevenueGrowth };

      const data = await getListStockByMarketValueRevenueGrowth();
      setDataListStocksByRevenueGrowth(data);
      return data;
    },
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60 * 24,
    onError: (err) => {
      console.error(err);
    },
    onSuccess: (data) => {
      setDataListStocksByRevenueGrowth(data);
    },
  });

  return { dataListStocksByRevenueGrowth, isLoadingListStocksByRevenueGrowth: isLoading, error };
}
