import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { getListFiisByQuotation } from "@/app/api/findListFiis/getListFiisByQuotation";
import { initialStateFiisProvider } from "@/lib/utils";
import { ListFiisModel } from "@/models/Lists/ListFiisModel";

interface ListFiisByQuotationState {
  dataListFiisByQuotation: ListFiisModel;
  setDataListFiisByQuotation: (data: ListFiisModel) => void;
}

const useListFiisByQuotationStore = create<ListFiisByQuotationState>()(
  persist(
    (set) => ({
      dataListFiisByQuotation: initialStateFiisProvider,
      setDataListFiisByQuotation: (data) => set({ dataListFiisByQuotation: data }),
    }),
    {
      name: "list-fiis-by-quotation-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ dataListFiisByQuotation: state.dataListFiisByQuotation }),
    },
  ),
);

export function useListFiisByQuotation() {
  const { setDataListFiisByQuotation, dataListFiisByQuotation } = useListFiisByQuotationStore();

  const { isLoading, error } = useQuery({
    queryKey: ["list-fiis-by-quotation"],
    queryFn: async () => {
      if (dataListFiisByQuotation?.content?.length) return { content: dataListFiisByQuotation };

      const data = await getListFiisByQuotation();
      setDataListFiisByQuotation(data);
      return data;
    },
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60 * 24,
    onError: (err) => {
      console.error(err);
    },
    onSuccess: (data) => {
      setDataListFiisByQuotation(data);
    },
  });

  return { dataListFiisByQuotation: dataListFiisByQuotation, isLoadingListFiisByQuotation: isLoading, error };
}
