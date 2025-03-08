"use client";

import { useMutation } from "@tanstack/react-query";
import React, { createContext, useContext, useState } from "react";

import { ListCryptoModel } from "@/models/Lists/ListCryptoModel";

import { postRecommendationCrypto } from "../../api/postRecommendationCrypto";

interface ContextProps {
  dataRecommendationCrypto: ListCryptoModel[];
  isLoadingRecommendationCrypto: boolean;
  mutateRecommendationCrypto: (cryptos: ListCryptoModel[]) => Promise<void>;
}

interface RecommendationCryptoProviderProps {
  children: React.ReactNode;
}

export const RecommendationCryptoProviderContext = createContext<ContextProps>({} as ContextProps);

export const RecommendationCryptoProvider = ({ children }: RecommendationCryptoProviderProps) => {
  const [dataRecommendationCrypto, setDataRecommendationCrypto] = useState<ListCryptoModel[]>([]);

  const { isLoading: isLoadingRecommendationCrypto, mutateAsync: mutateRecommendationCrypto } = useMutation({
    mutationKey: ["mutation-recommendation-crypto"],
    mutationFn: (cryptos: ListCryptoModel[]) => postRecommendationCrypto(cryptos),
    onSuccess(data) {
      setDataRecommendationCrypto(data);
    },
  });

  return (
    <RecommendationCryptoProviderContext.Provider
      value={{ dataRecommendationCrypto, isLoadingRecommendationCrypto, mutateRecommendationCrypto }}
    >
      {children}
    </RecommendationCryptoProviderContext.Provider>
  );
};

export const useRecommendationCrypto = () => useContext(RecommendationCryptoProviderContext);
