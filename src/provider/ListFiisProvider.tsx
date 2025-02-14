"use client";

import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { getListFiis } from "@/api/getListFiis";
import { ListFiisModelContent } from "@/models/Lists/ListFiisModel";

interface ListFiisState {
  dataListFiis: ListFiisModelContent[];
  isLoadingListFiis: boolean;
  setDataListFiis: (data: ListFiisModelContent[]) => void;
  setIsLoadingListFiis: (loading: boolean) => void;
}

const useListFiisStore = create<ListFiisState>()(
  persist(
    (set) => ({
      dataListFiis: [],
      isLoadingListFiis: false,
      setDataListFiis: (data) => set({ dataListFiis: data }),
      setIsLoadingListFiis: (loading) => set({ isLoadingListFiis: loading }),
    }),
    {
      name: "listFiis-storage",
      getStorage: () => localStorage,
    },
  ),
);

const getCachedData = (): ListFiisModelContent[] | null => {
  const cachedData = localStorage.getItem("listFiis-storage");
  return cachedData ? (JSON.parse(cachedData)?.state?.dataListFiis ?? null) : null;
};

export function useListFiis() {
  const { setIsLoadingListFiis, setDataListFiis, dataListFiis, isLoadingListFiis } = useListFiisStore();

  const { isLoading, error } = useQuery({
    queryKey: ["list-fiis"],
    queryFn: async () => {
      const cachedData = getCachedData();
      if (cachedData?.length) return { content: cachedData };
      const data = await getListFiis();
      setDataListFiis(data.content);
      return data;
    },
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60 * 24,
    onError: (err) => {
      console.error(err);
      setIsLoadingListFiis(false);
    },
    onSettled: () => {
      const cachedData = getCachedData();
      setDataListFiis(cachedData ?? []);
      setIsLoadingListFiis(cachedData ? false : isLoading);
    },
  });

  return { dataListFiis, isLoadingListFiis, error };
}
