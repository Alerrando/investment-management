import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { getListFiisByQuantityProperty } from "@/app/api/findListFiis/getListFiisByQuantityProperty";
import { initialStateStockProvider } from "@/lib/utils";
import { ListFiisModel } from "@/models/Lists/ListFiisModel";

interface ListFiisByQuantityPropertyState {
  dataListFiisByQuantityProperty: ListFiisModel;
  setDataListFiisByQuantityProperty: (data: ListFiisModel) => void;
}

const useListFiisByQuantityPropertyStore = create<ListFiisByQuantityPropertyState>()(
  persist(
    (set) => ({
      dataListFiisByQuantityProperty: initialStateStockProvider,
      setDataListFiisByQuantityProperty: (data) => set({ dataListFiisByQuantityProperty: data }),
    }),
    {
      name: "list-fiis-by-quantity-property-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ dataListFiisByQuantityProperty: state.dataListFiisByQuantityProperty }),
    },
  ),
);

export function useListFiisByQuantityProperty() {
  const { setDataListFiisByQuantityProperty, dataListFiisByQuantityProperty } = useListFiisByQuantityPropertyStore();

  const { isLoading, error } = useQuery({
    queryKey: ["list-fiis-by-quantity-property"],
    queryFn: async () => {
      if (dataListFiisByQuantityProperty?.content?.length) return { content: dataListFiisByQuantityProperty };

      const data = await getListFiisByQuantityProperty();
      setDataListFiisByQuantityProperty(data);
      return data;
    },
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60 * 24,
    onError: (err) => {
      console.error(err);
    },
    onSuccess: (data) => {
      setDataListFiisByQuantityProperty(data);
    },
  });

  return {
    dataListFiisByQuantityProperty: dataListFiisByQuantityProperty,
    isLoadingListFiisByQuantityProperty: isLoading,
    error,
  };
}
