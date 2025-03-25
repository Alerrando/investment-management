import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { getListFiisByDividend } from "@/app/api/findListFiis/getListFiisByDividend";
import { initialStateStockProvider } from "@/lib/utils";
import { ListFiisModel } from "@/models/Lists/ListFiisModel";

interface ListFiisByDividendState {
  dataListFiisByDividend: ListFiisModel;
  setDataListFiisByDividend: (data: ListFiisModel) => void;
}

const useListFiisByDividendStore = create<ListFiisByDividendState>()(
  persist(
    (set) => ({
      dataListFiisByDividend: initialStateStockProvider,
      setDataListFiisByDividend: (data) => set({ dataListFiisByDividend: data }),
    }),
    {
      name: "list-fiis-by-dividend-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ dataListFiisByDividend: state.dataListFiisByDividend }),
    },
  ),
);

export function useListFiisByDividend() {
  const { setDataListFiisByDividend, dataListFiisByDividend } = useListFiisByDividendStore();

  const { isLoading, error } = useQuery({
    queryKey: ["list-fiis-by-dividend"],
    queryFn: async () => {
      if (dataListFiisByDividend?.content?.length) return { content: dataListFiisByDividend };

      const data = await getListFiisByDividend();
      setDataListFiisByDividend(data);
      return data;
    },
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60 * 24,
    onError: (err) => {
      console.error(err);
    },
    onSuccess: (data) => {
      setDataListFiisByDividend(data);
    },
  });

  return { dataListFiisByDividend: dataListFiisByDividend, isLoadingListFiisByDividend: isLoading, error };
}
