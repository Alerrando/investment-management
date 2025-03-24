import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { initialStateFiisProvider } from "@/lib/utils";
import { ListFiisModel } from "@/models/Lists/ListFiisModel";

import { getListFiis } from "../../app/api/getListFiis";

interface ListFiisState {
  dataListFiis: ListFiisModel;
  setDataListFiis: (data: ListFiisModel) => void;
}

const useListFiisStore = create<ListFiisState>()(
  persist(
    (set) => ({
      dataListFiis: initialStateFiisProvider,
      setDataListFiis: (data) =>
        set({
          dataListFiis: data.content ? { ...data, content: data.content } : data,
        }),
    }),
    {
      name: "listFiis-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ dataListFiis: state.dataListFiis }),
    },
  ),
);

export function useListFiis() {
  const { setDataListFiis, dataListFiis } = useListFiisStore();

  const { isLoading, error } = useQuery({
    queryKey: ["list-fiis"],
    queryFn: async () => {
      if (dataListFiis?.content?.length) return { content: dataListFiis };

      const data = await getListFiis();
      setDataListFiis(data);
      return data;
    },
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60 * 24,
    onError: (err) => {
      console.error(err);
    },
    onSuccess: (data) => {
      setDataListFiis(data);
    },
  });

  return { dataListFiis: dataListFiis, isLoadingListFiis: isLoading, error };
}
