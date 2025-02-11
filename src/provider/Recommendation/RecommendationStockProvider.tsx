"use client";

import React, { createContext, useContext, useState } from "react";

import { postRecommendationStock } from "@/api/postRecommendationStock";
import { useMutationHook } from "@/hook/useMutationHook";
import { ListStockModelContent } from "@/models/Lists/ListStockModel";

interface ContextProps {
  dataRecommendationStock: ListStockModelContent[];
  isLoadingRecommendationStocks: boolean;
  mutateRecommendationStock: (stocks: ListStockModelContent[]) => Promise<void>;
}

interface RecommendationStocksProviderProps {
  children: React.ReactNode;
}

export const RecommendationStockProviderContext = createContext<ContextProps>({} as ContextProps);

export const RecommendationStocksProvider = ({ children }: RecommendationStocksProviderProps) => {
  const [dataRecommendationStock, setDataRecommendationStock] = useState<ListStockModelContent[]>(
    [] as ListStockModelContent[],
  );

  const { isLoading: isLoadingRecommendationStocks, mutateAsync: mutateRecommendationStock } = useMutationHook<
    ListStockModelContent[],
    unknown,
    ListStockModelContent[]
  >({
    mutationKey: ["mutation-recommendation-stocks"],
    options: {
      mutationFn: (stocks: ListStockModelContent[]) => postRecommendationStock(stocks),
      onSuccess(data) {
        setDataRecommendationStock(data);
      },
    },
  });

  return (
    <RecommendationStockProviderContext.Provider
      value={{ dataRecommendationStock, isLoadingRecommendationStocks, mutateRecommendationStock }}
    >
      {children}
    </RecommendationStockProviderContext.Provider>
  );
};

export const useRecommendationStocks = () => useContext(RecommendationStockProviderContext);
