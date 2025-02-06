"use client";

import React, { createContext, useContext, useState } from "react";

import { getListStock } from "@/api/getListStock";
import { useQueryHook } from "@/hook/useQueryHook";
import { ListStockModel, ListStockModelContent } from "@/models/Lists/ListStockModel";

interface ContextProps {
  dataListStocks: ListStockModelContent[];
  isLoadingListStocks: boolean;
}

interface ListStocksProviderProps {
  children: React.ReactNode;
}

export const ListStocksProviderContext = createContext<ContextProps>({} as ContextProps);

export const ListStocksProvider = ({ children }: ListStocksProviderProps) => {
  const [dataListStocks, setDataListStocks] = useState<ListStockModelContent[]>([]);
  const { isLoading: isLoadingListStocks } = useQueryHook<ListStockModel>({
    queryKey: ["query-list-stocks"],
    options: {
      queryFn: () => getListStock(),
      staleTime: Infinity,
      cacheTime: Infinity,
      onSuccess(data) {
        setDataListStocks(data.content);
      },
      onError(err) {
        console.log(err);
      },
    },
  });

  return (
    <ListStocksProviderContext.Provider value={{ dataListStocks, isLoadingListStocks }}>
      {children}
    </ListStocksProviderContext.Provider>
  );
};

export const useListStocks = () => useContext(ListStocksProviderContext);
