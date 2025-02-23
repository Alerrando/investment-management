import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { getListCrypto } from "@/api/getListCryptos";
import { ListCryptoModel } from "@/models/Lists/ListCryptoModel";

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
      setDataListCrypto(data.content);
    },
  });

  return { dataListCrypto: dataListCrypto, isLoadingListCrypto: isLoading, error };
}
