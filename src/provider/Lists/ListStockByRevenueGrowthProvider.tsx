import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { getListStockByRevenueGrowth } from "@/api/getListStockByRevenueGrowth";
import { ListStockModelContent } from "@/models/Lists/ListStockModel";

interface ListStocksByRevenueGrowthState {
  dataListStocksByRevenueGrowth: ListStockModelContent[];
  setDataListStocksByRevenueGrowth: (data: ListStockModelContent[]) => void;
}

const useListStocksByRevenueGrowthStore = create<ListStocksByRevenueGrowthState>()(
  persist(
    (set) => ({
      dataListStocksByRevenueGrowth: [],
      setDataListStocksByRevenueGrowth: (data) => set({ dataListStocksByRevenueGrowth: data }),
    }),
    {
      name: "list-stocks-by-revenue-growth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export function useListStocksByRevenueGrowth() {
  const { setDataListStocksByRevenueGrowth, dataListStocksByRevenueGrowth } = useListStocksByRevenueGrowthStore();

  const { isLoading, error } = useQuery({
    queryKey: ["list-stocks-by-revenue-growth"],
    queryFn: async () => {
      if (dataListStocksByRevenueGrowth?.length) return { content: dataListStocksByRevenueGrowth };

      const data = await getListStockByRevenueGrowth();
      setDataListStocksByRevenueGrowth(data.content);
      return data.content;
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
