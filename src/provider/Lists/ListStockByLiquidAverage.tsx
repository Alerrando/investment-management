import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { getListStockByLiquidAverage } from "@/api/getListStockByLiquidAverage";
import { ListStockModelContent } from "@/models/Lists/ListStockModel";

interface ListStocksByLiquidAverageState {
  dataListStocksByLiquidAverage: ListStockModelContent[];
  setDataListStocksByLiquidAverage: (data: ListStockModelContent[]) => void;
}

const useListStocksByLiquidAverageStore = create<ListStocksByLiquidAverageState>()(
  persist(
    (set) => ({
      dataListStocksByLiquidAverage: [],
      setDataListStocksByLiquidAverage: (data) => set({ dataListStocksByLiquidAverage: data }),
    }),
    {
      name: "list-stocks-by-liquid-average-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export function useListStocksByLiquidAverage() {
  const { setDataListStocksByLiquidAverage, dataListStocksByLiquidAverage } = useListStocksByLiquidAverageStore();

  const { isLoading, error } = useQuery({
    queryKey: ["list-stocks-by-LiquidAverage"],
    queryFn: async () => {
      if (dataListStocksByLiquidAverage?.length) return { content: dataListStocksByLiquidAverage };

      const data = await getListStockByLiquidAverage();
      setDataListStocksByLiquidAverage(data.content);
      return data.content;
    },
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60 * 24,
    onError: (err) => {
      console.error(err);
    },
    onSuccess: (data) => {
      setDataListStocksByLiquidAverage(data);
    },
  });

  return {
    dataListStocksByLiquidAverage: dataListStocksByLiquidAverage,
    isLoadingListStocksByLiquidAverage: isLoading,
    error,
  };
}
