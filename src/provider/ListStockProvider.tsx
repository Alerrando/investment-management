"use client";

import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { getListStock } from "@/api/getListStock";
import { ListStockModelContent } from "@/models/Lists/ListStockModel";

interface ListStocksState {
  dataListStocks: ListStockModelContent[];
  isLoadingListStocks: boolean;
  setDataListStocks: (data: ListStockModelContent[]) => void;
  setIsLoadingListStocks: (loading: boolean) => void;
}

const useListStocksStore = create<ListStocksState>()(
  persist(
    (set) => ({
      dataListStocks: [],
      isLoadingListStocks: false,
      setDataListStocks: (data) => set({ dataListStocks: data }),
      setIsLoadingListStocks: (loading) => set({ isLoadingListStocks: loading }),
    }),
    {
      name: "listStocks-storage",
      storage: () => localStorage,
    },
  ),
);

const getCachedDataStocks = (): ListStockModelContent[] | null => {
  const cachedData = localStorage.getItem("listStocks-storage");
  return cachedData ? (JSON.parse(cachedData)?.state?.dataListStocks ?? null) : null;
};

export function useListStocks() {
  const { setIsLoadingListStocks, setDataListStocks, dataListStocks, isLoadingListStocks } = useListStocksStore();

  const { isLoading, error } = useQuery({
    queryKey: ["list-stocks"],
    queryFn: async () => {
      const cachedData = getCachedDataStocks();
      if (cachedData?.length) return { content: cachedData };
      const data = await getListStock();
      setDataListStocks(data.content);
      return data;
    },
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60 * 24,
    onError: (err) => {
      console.error(err);
      setIsLoadingListStocks(false);
    },
    onSettled: () => {
      const cachedData = getCachedDataStocks();
      setDataListStocks(cachedData ?? []);
      setIsLoadingListStocks(cachedData ? false : isLoading);
    },
  });

  return { dataListStocks, isLoadingListStocks, error };
}
