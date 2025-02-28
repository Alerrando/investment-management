import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { getListStockByRoe } from "@/api/getListStockByRoe";
import { ListStockModelContent } from "@/models/Lists/ListStockModel";

interface ListStocksByRoeState {
  dataListStocksByRoe: ListStockModelContent[];
  setDataListStocksByRoe: (data: ListStockModelContent[]) => void;
}

const useListStocksByRoeStore = create<ListStocksByRoeState>()(
  persist(
    (set) => ({
      dataListStocksByRoe: [],
      setDataListStocksByRoe: (data) => set({ dataListStocksByRoe: data }),
    }),
    {
      name: "list-stocks-by-roe-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export function useListStocksByRoe() {
  const { setDataListStocksByRoe, dataListStocksByRoe } = useListStocksByRoeStore();

  const { isLoading, error } = useQuery({
    queryKey: ["list-stocks-by-roe"],
    queryFn: async () => {
      if (dataListStocksByRoe?.length) return { content: dataListStocksByRoe };

      const data = await getListStockByRoe();
      setDataListStocksByRoe(data.content);
      return data.content;
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
