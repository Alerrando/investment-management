"use client";

import React, { createContext, useContext, useState } from "react";

import { authValidation } from "@/api/authValidation";
import { useQueryHook } from "@/hook/useQueryHook";

interface ContextProps {
  isLoadingAuthValidation: boolean;
  setToken: (token: string | null) => void;
}

interface ValidationAuthProviderProps {
  children: React.ReactNode;
}

export const ValidationAuthProviderContext = createContext<ContextProps>({} as ContextProps);

export const ValidationAuthProvider = ({ children }: ValidationAuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const { isLoading: isLoadingAuthValidation } = useQueryHook({
    queryKey: ["validation-auth"],
    options: {
      queryFn: () => {
        if (!token) {
          return Promise.reject("Token não disponível");
        }
        return authValidation(token);
      },
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  });

  return (
    <ValidationAuthProviderContext.Provider value={{ isLoadingAuthValidation, setToken }}>
      {children}
    </ValidationAuthProviderContext.Provider>
  );
};

export const useValidationAuth = () => useContext(ValidationAuthProviderContext);
