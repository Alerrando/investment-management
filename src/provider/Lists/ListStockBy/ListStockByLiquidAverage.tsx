import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { initialStateStockProvider } from "@/lib/utils";
import { ListStockModel } from "@/models/Lists/ListStockModel";

import { getListStockByLiquidAverage } from "../../../api/getListStockByLiquidAverage";

interface ListStocksByLiquidAverageState {
  dataListStocksByLiquidAverage: ListStockModel;
  setDataListStocksByLiquidAverage: (data: ListStockModel) => void;
}

const useListStocksByLiquidAverageStore = create<ListStocksByLiquidAverageState>()(
  persist(
    (set) => ({
      dataListStocksByLiquidAverage: initialStateStockProvider,
      setDataListStocksByLiquidAverage: (data) => set({ dataListStocksByLiquidAverage: data }),
    }),
    {
      name: "list-stocks-by-liquid-average-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ dataListStocksByLiquidAverage: state.dataListStocksByLiquidAverage }),
    },
  ),
);

export function useListStocksByLiquidAverage() {
  const { setDataListStocksByLiquidAverage, dataListStocksByLiquidAverage } = useListStocksByLiquidAverageStore();

  const { isLoading, error } = useQuery({
    queryKey: ["list-stocks-by-LiquidAverage"],
    queryFn: async () => {
      if (dataListStocksByLiquidAverage?.content?.length) return { content: dataListStocksByLiquidAverage };

      const data = await getListStockByLiquidAverage();
      setDataListStocksByLiquidAverage(data);
      return data;
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
