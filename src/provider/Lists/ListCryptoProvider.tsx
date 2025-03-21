import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { ListCryptoModel } from "@/models/Lists/ListCryptoModel";

import { getListCrypto } from "../../app/api/getListCryptos";

interface ListCryptoState {
  dataListCrypto: ListCryptoModel[];
  setDataListCrypto: (data: ListCryptoModel[]) => void;
}

const useListCryptoStore = create<ListCryptoState>()(
  persist(
    (set) => ({
      dataListCrypto: [],
      setDataListCrypto: (data) => set({ dataListCrypto: data }),
    }),
    {
      name: "listCrypto-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ dataListCrypto: state.dataListCrypto }),
    },
  ),
);

export function useListCrypto() {
  const { setDataListCrypto, dataListCrypto } = useListCryptoStore();

  const { isLoading, error } = useQuery({
    queryKey: ["list-crypto"],
    queryFn: async () => {
      if (dataListCrypto.length) return { content: dataListCrypto };

      const fetchedData = await getListCrypto();
      setDataListCrypto(fetchedData);
      return fetchedData;
    },
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60 * 24,
    onError: (err) => {
      console.error(err);
    },
    onSuccess: (data) => {
      setDataListCrypto(data);
    },
  });

  return { dataListCrypto: dataListCrypto, isLoadingListCrypto: isLoading, error };
}
