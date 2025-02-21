import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { getListFiis } from "@/api/getListFiis";
import { ListFiisModelContent } from "@/models/Lists/ListFiisModel";

interface ListFiisState {
  dataListFiis: ListFiisModelContent[];
  setDataListFiis: (data: ListFiisModelContent[]) => void;
}

const useListFiisStore = create<ListFiisState>()(
  persist(
    (set) => ({
      dataListFiis: [],
      setDataListFiis: (data) => set({ dataListFiis: data }),
    }),
    {
      name: "listFiis-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export function useListFiis() {
  const { setDataListFiis, dataListFiis } = useListFiisStore();

  const { isLoading, error, data } = useQuery({
    queryKey: ["list-fiis"],
    queryFn: async () => {
      if (dataListFiis?.length) return { content: dataListFiis };

      const data = await getListFiis();
      setDataListFiis(data.content);
      return data.content;
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

  return { dataListFiis: dataListFiis || data, isLoadingListFiis: isLoading, error };
}
