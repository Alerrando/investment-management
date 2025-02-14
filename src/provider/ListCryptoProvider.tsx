"use client";

import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { getListCrypto } from "@/api/getListCryptos";
import { ListCryptoModel } from "@/models/Lists/ListCryptoModel";

interface ListCryptoState {
  dataListCrypto: ListCryptoModel[];
  isLoadingListCrypto: boolean;
  setDataListCrypto: (data: ListCryptoModel[]) => void;
  setIsLoadingListCrypto: (loading: boolean) => void;
}

const useListCryptoStore = create<ListCryptoState>()(
  persist(
    (set) => ({
      dataListCrypto: [],
      isLoadingListCrypto: false,
      setDataListCrypto: (data) => set({ dataListCrypto: data }),
      setIsLoadingListCrypto: (loading) => set({ isLoadingListCrypto: loading }),
    }),
    {
      name: "listCrypto-storage",
      getStorage: () => localStorage,
    },
  ),
);

const getCachedDataCrypto = (): ListCryptoModel[] | null => {
  const cachedData = localStorage.getItem("listCrypto-storage");
  return cachedData ? (JSON.parse(cachedData)?.state?.dataListCrypto ?? null) : null;
};

export function useListCrypto() {
  const { setIsLoadingListCrypto, setDataListCrypto, dataListCrypto, isLoadingListCrypto } = useListCryptoStore();

  const { isLoading, error } = useQuery({
    queryKey: ["list-crypto"],
    queryFn: async () => {
      const cachedData = getCachedDataCrypto();
      if (cachedData?.length) return { content: cachedData };
      const data = await getListCrypto();
      setDataListCrypto(data);
      return data;
    },
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60 * 24,
    onError: (err) => {
      console.error(err);
      setIsLoadingListCrypto(false);
    },
    onSettled: () => {
      const cachedData = getCachedDataCrypto();
      setDataListCrypto(cachedData ?? []);
      setIsLoadingListCrypto(cachedData ? false : isLoading);
    },
  });

  return { dataListCrypto, isLoadingListCrypto, error };
}
