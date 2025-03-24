import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { initialStateStockProvider } from "@/lib/utils";
import { ListStockModel } from "@/models/Lists/ListStockModel";

import { getListStockByPl } from "../../../app/api/findListStock/getListStockByPl";

interface ListStocksByPLState {
  dataListStocksByPL: ListStockModel;
  setDataListStocksByPL: (data: ListStockModel) => void;
}

const useListStocksByPLStore = create<ListStocksByPLState>()(
  persist(
    (set) => ({
      dataListStocksByPL: initialStateStockProvider,
      setDataListStocksByPL: (data) => set({ dataListStocksByPL: data }),
    }),
    {
      name: "list-stocks-by-pl-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ dataListStocksByPL: state.dataListStocksByPL }),
    },
  ),
);

export function useListStocksByPL() {
  const { setDataListStocksByPL, dataListStocksByPL } = useListStocksByPLStore();

  const { isLoading, error } = useQuery({
    queryKey: ["list-stocks-by-pl"],
    queryFn: async () => {
      if (dataListStocksByPL?.content?.length) return { content: dataListStocksByPL };

      const data = await getListStockByPl();
      setDataListStocksByPL(data);
      return data;
    },
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60 * 24,
    onError: (err) => {
      console.error(err);
    },
    onSuccess: (data) => {
      setDataListStocksByPL(data);
    },
  });

  return { dataListStocksByPL, isLoadingListStocksByPL: isLoading, error };
}
