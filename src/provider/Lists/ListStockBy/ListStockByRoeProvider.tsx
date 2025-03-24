import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { initialStateStockProvider } from "@/lib/utils";
import { ListStockModel } from "@/models/Lists/ListStockModel";

import { getListStockByRoe } from "../../../app/api/findListStock/getListStockByRoe";

interface ListStocksByRoeState {
  dataListStocksByRoe: ListStockModel;
  setDataListStocksByRoe: (data: ListStockModel) => void;
}

const useListStocksByRoeStore = create<ListStocksByRoeState>()(
  persist(
    (set) => ({
      dataListStocksByRoe: initialStateStockProvider,
      setDataListStocksByRoe: (data) => set({ dataListStocksByRoe: data }),
    }),
    {
      name: "list-stocks-by-roe-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ dataListStocksByRoe: state.dataListStocksByRoe }),
    },
  ),
);

export function useListStocksByRoe() {
  const { setDataListStocksByRoe, dataListStocksByRoe } = useListStocksByRoeStore();

  const { isLoading, error } = useQuery({
    queryKey: ["list-stocks-by-roe"],
    queryFn: async () => {
      if (dataListStocksByRoe?.content?.length) return { content: dataListStocksByRoe };

      const data = await getListStockByRoe();
      setDataListStocksByRoe(data);
      return data;
    },
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60 * 24,
    onError: (err) => {
      console.error(err);
    },
    onSuccess: (data) => {
      setDataListStocksByRoe(data);
    },
  });

  return { dataListStocksByRoe, isLoadingListStocksByRoe: isLoading, error };
}
