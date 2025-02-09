"use client";

import React, { createContext, useContext, useState } from "react";

import { postRecommendationFiis } from "@/api/postRecommendationFiis";
import { useMutationHook } from "@/hook/useMutationHook";
import { ListFiisModelContent } from "@/models/Lists/ListFiisModel";

interface ContextProps {
  dataRecommendationFiis: ListFiisModelContent[];
  isLoadingRecommendationStocks: boolean;
  mutateRecommendationFiis: (stocks: ListFiisModelContent[]) => Promise<void>;
}

interface RecommendationFiisProviderProps {
  children: React.ReactNode;
}

export const RecommendationFiisProviderContext = createContext<ContextProps>({} as ContextProps);

export const RecommendationFiisProvider = ({ children }: RecommendationFiisProviderProps) => {
  const [dataRecommendationFiis, setDataRecommendationFiis] = useState<ListFiisModelContent[]>(
    [] as ListFiisModelContent[],
  );

  const { isLoading: isLoadingRecommendationFiis, mutateAsync: mutateRecommendationFiis } = useMutationHook<
    ListFiisModelContent[]
  >({
    mutationKey: ["mutation-recommendation-fiis"],
    options: {
      mutationFn: (fiis: ListFiisModelContent[]) => postRecommendationFiis(fiis),
      onSuccess(data) {
        setDataRecommendationFiis(data);
      },
    },
  });

  return (
    <RecommendationFiisProviderContext.Provider
      value={{ dataRecommendationFiis, isLoadingRecommendationFiis, mutateRecommendationFiis }}
    >
      {children}
    </RecommendationFiisProviderContext.Provider>
  );
};

export const useRecommendationFiis = () => useContext(RecommendationFiisProviderContext);
