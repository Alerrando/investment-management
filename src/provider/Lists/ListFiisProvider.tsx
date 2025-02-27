import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { getListFiis } from "@/api/getListFiis";
import { ListFiisModel } from "@/models/Lists/ListFiisModel";

const initialState: ListFiisModel = {
  content: [],
  pageable: {
    sort: {
      unsorted: true,
      sorted: false,
      empty: true,
    },
    offset: 0,
    pageNumber: 0,
    pageSize: 10,
    paged: true,
    unpaged: false,
  },
  totalPages: 0,
  totalElements: 0,
  last: false,
  size: 0,
  number: 0,
  sort: {
    unsorted: true,
    sorted: false,
    empty: true,
  },
  numberOfElements: 0,
  first: true,
  empty: true,
};

interface ListFiisState {
  dataListFiis: ListFiisModel;
  setDataListFiis: (data: ListFiisModel) => void;
}

const useListFiisStore = create<ListFiisState>()(
  persist(
    (set) => ({
      dataListFiis: initialState,
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
