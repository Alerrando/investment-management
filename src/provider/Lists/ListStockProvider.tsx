import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { getListStock } from "@/api/getListStock";
import { ListStockModel } from "@/models/Lists/ListStockModel";

const initialState: ListStockModel = {
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

interface ListStocksState {
  dataListStocks: ListStockModel;
  setDataListStocks: (data: ListStockModel) => void;
}

const useListStocksStore = create<ListStocksState>()(
  persist(
    (set) => ({
      dataListStocks: initialState,
      setDataListStocks: (data) => set({ dataListStocks: data }),
    }),
    {
      name: "listStocks-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export function useListStocks() {
  const { setDataListStocks, dataListStocks } = useListStocksStore();

  const { isLoading, error } = useQuery({
    queryKey: ["list-stocks"],
    queryFn: async () => {
      if (dataListStocks?.content?.length) return { content: dataListStocks };

      const data = await getListStock();
      setDataListStocks(data);
      return data;
    },
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60 * 24,
    onError: (err) => {
      console.error(err);
    },
    onSuccess: (data) => {
      setDataListStocks(data);
    },
  });

  return { dataListStocks: dataListStocks, isLoadingListStocks: isLoading, error };
}
