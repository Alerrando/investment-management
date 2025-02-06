"use client";

import React, { createContext, useContext, useState } from "react";

import { getListFiis } from "@/api/getListFiis";
import { useQueryHook } from "@/hook/useQueryHook";
import { ListFiisModel, ListFiisModelContent } from "@/models/Lists/ListFiisModel";

interface ContextProps {
  dataListFiis: ListFiisModelContent[];
  isLoadingListFiis: boolean;
}

interface ListFiisProviderProps {
  children: React.ReactNode;
}

export const ListFiisProviderContext = createContext<ContextProps>({} as ContextProps);

export const ListFiisProvider = ({ children }: ListFiisProviderProps) => {
  const [dataListFiis, setDataListFiis] = useState<ListFiisModelContent[]>([] as ListFiisModelContent[]);
  const { isLoading: isLoadingListFiis } = useQueryHook<ListFiisModel>({
    queryKey: ["query-list-fiis"],
    options: {
      queryFn: () => getListFiis(),
      staleTime: Infinity,
      cacheTime: Infinity,
      onSuccess(data) {
        setDataListFiis(data.content);
      },
      onError(err) {
        console.log(err);
      },
    },
  });

  return (
    <ListFiisProviderContext.Provider value={{ dataListFiis, isLoadingListFiis }}>
      {children}
    </ListFiisProviderContext.Provider>
  );
};

export const useListFiis = () => useContext(ListFiisProviderContext);
