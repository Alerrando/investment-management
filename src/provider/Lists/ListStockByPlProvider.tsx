import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { getListStockByPl } from "@/api/getListStockByPl";
import { ListStockModelContent } from "@/models/Lists/ListStockModel";

interface ListStocksByPLState {
  dataListStocksByPL: ListStockModelContent[];
  setDataListStocksByPL: (data: ListStockModelContent[]) => void;
}

const useListStocksByPLStore = create<ListStocksByPLState>()(
  persist(
    (set) => ({
      dataListStocksByPL: [],
      setDataListStocksByPL: (data) => set({ dataListStocksByPL: data }),
    }),
    {
      name: "list-stocks-by-pl-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export function useListStocksByPL() {
  const { setDataListStocksByPL, dataListStocksByPL } = useListStocksByPLStore();

  const { isLoading, error } = useQuery({
    queryKey: ["list-stocks-by-pl"],
    queryFn: async () => {
      if (dataListStocksByPL?.length) return { content: dataListStocksByPL };

      const data = await getListStockByPl();
      setDataListStocksByPL(data.content);
      return data.content;
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
