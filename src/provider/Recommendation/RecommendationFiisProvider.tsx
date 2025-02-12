"use client";

import { useMutation } from "@tanstack/react-query";
import React, { createContext, useContext, useState } from "react";

import { postRecommendationFiis } from "@/api/postRecommendationFiis";
import { ListFiisModelContent } from "@/models/Lists/ListFiisModel";

interface ContextProps {
  dataRecommendationFiis: ListFiisModelContent[];
  isLoadingRecommendationFiis: boolean;
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

  const { isLoading: isLoadingRecommendationFiis, mutateAsync: mutateRecommendationFiis } = useMutation({
    mutationKey: ["mutation-recommendation-fiis"],
    mutationFn: (fiis: ListFiisModelContent[]) => postRecommendationFiis(fiis),
    onSuccess(data) {
      setDataRecommendationFiis(data);
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
