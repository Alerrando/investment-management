"use client";

import React, { createContext, useContext, useState } from "react";

import { getListCrypto } from "@/api/getListCryptos";
import { useQueryHook } from "@/hook/useQueryHook";
import { ListCryptoModel } from "@/models/Lists/ListCryptoModel";

interface ContextProps {
  dataListCrypto: ListCryptoModel[];
  isLoadingListCrypto: boolean;
}

interface ListCryptoProviderProps {
  children: React.ReactNode;
}

export const ListCryptoProviderContext = createContext<ContextProps>({} as ContextProps);

export const ListCryptoProvider = ({ children }: ListCryptoProviderProps) => {
  const [dataListCrypto, setDataListCrypto] = useState<ListCryptoModel[]>([] as ListCryptoModel[]);
  const { isLoading: isLoadingListCrypto } = useQueryHook<ListCryptoModel[]>({
    queryKey: ["query-list-crypto"],
    options: {
      queryFn: () => getListCrypto(),
      staleTime: Infinity,
      cacheTime: Infinity,
      onSuccess(data) {
        setDataListCrypto(data);
      },
      onError(err) {
        console.log(err);
      },
    },
  });

  return (
    <ListCryptoProviderContext.Provider value={{ dataListCrypto, isLoadingListCrypto }}>
      {children}
    </ListCryptoProviderContext.Provider>
  );
};

export const useListCrypto = () => useContext(ListCryptoProviderContext);
