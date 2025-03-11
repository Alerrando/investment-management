import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { initialStateStockProvider } from "@/lib/utils";
import { ListStockModel } from "@/models/Lists/ListStockModel";

import { getListStockByDividend } from "../../../app/api/getListStockByDividend";

interface ListStocksByDividendState {
  dataListStocksByDividend: ListStockModel;
  setDataListStocksByDividend: (data: ListStockModel) => void;
}

const useListStocksByDividendStore = create<ListStocksByDividendState>()(
  persist(
    (set) => ({
      dataListStocksByDividend: initialStateStockProvider,
      setDataListStocksByDividend: (data) => set({ dataListStocksByDividend: data }),
    }),
    {
      name: "list-stocks-by-dividend-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ dataListStocksByDividend: state.dataListStocksByDividend }),
    },
  ),
);

export function useListStocksByDividend() {
  const { setDataListStocksByDividend, dataListStocksByDividend } = useListStocksByDividendStore();

  const { isLoading, error } = useQuery({
    queryKey: ["list-stocks-by-dividend"],
    queryFn: async () => {
      if (dataListStocksByDividend?.content?.length) return { content: dataListStocksByDividend };

      const data = await getListStockByDividend();
      setDataListStocksByDividend(data);
      return data;
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

  return { dataListStocksByDividend: dataListStocksByDividend, isLoadingListStocksByDividend: isLoading, error };
}
