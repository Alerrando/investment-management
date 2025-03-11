"use client";

import { useMutation } from "@tanstack/react-query";
import React, { createContext, useContext, useState } from "react";

import { ListStockModelContent } from "@/models/Lists/ListStockModel";

import { postRecommendationStock } from "../../app/api/postRecommendationStock";

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

  const { isLoading: isLoadingRecommendationStocks, mutateAsync: mutateRecommendationStock } = useMutation({
    mutationKey: ["mutation-recommendation-stocks"],
    mutationFn: (stocks: ListStockModelContent[]) => postRecommendationStock(stocks),
    onSuccess(data) {
      setDataRecommendationStock(data);
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
