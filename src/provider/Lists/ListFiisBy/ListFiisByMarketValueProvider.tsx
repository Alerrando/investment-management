import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { getListFiisByMarketValue } from "@/app/api/findListFiis/getListFiisByMarketValue";
import { initialStateFiisProvider } from "@/lib/utils";
import { ListFiisModel } from "@/models/Lists/ListFiisModel";

interface ListFiisByMarketValueState {
  dataListFiisByMarketValue: ListFiisModel;
  setDataListFiisByMarketValue: (data: ListFiisModel) => void;
}

const useListFiisByMarketValueStore = create<ListFiisByMarketValueState>()(
  persist(
    (set) => ({
      dataListFiisByMarketValue: initialStateFiisProvider,
      setDataListFiisByMarketValue: (data) => set({ dataListFiisByMarketValue: data }),
    }),
    {
      name: "list-fiis-by-market-value-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ dataListFiisByMarketValue: state.dataListFiisByMarketValue }),
    },
  ),
);

export function useListFiisByMarketValue() {
  const { setDataListFiisByMarketValue, dataListFiisByMarketValue } = useListFiisByMarketValueStore();

  const { isLoading, error } = useQuery({
    queryKey: ["list-fiis-by-market-value"],
    queryFn: async () => {
      if (dataListFiisByMarketValue?.content?.length) return { content: dataListFiisByMarketValue };

      const data = await getListFiisByMarketValue();
      setDataListFiisByMarketValue(data);
      return data;
    },
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60 * 24,
    onError: (err) => {
      console.error(err);
    },
    onSuccess: (data) => {
      setDataListFiisByMarketValue(data);
    },
  });

  return { dataListFiisByMarketValue: dataListFiisByMarketValue, isLoadingListFiisByMarketValue: isLoading, error };
}
