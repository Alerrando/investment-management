"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { createContext, useContext } from "react";

import { authValidation } from "@/api/authValidation";

interface ContextProps {
  isLoadingAuthValidation: boolean;
  mutateValidationAuth: (data: string) => Promise<void>;
}

interface ValidationAuthProviderProps {
  children: React.ReactNode;
}

export const ValidationAuthProviderContext = createContext<ContextProps>({} as ContextProps);

export const ValidationAuthProvider = ({ children }: ValidationAuthProviderProps) => {
  const router = useRouter();
  const { isLoading: isLoadingAuthValidation, mutateAsync: mutateValidationAuth } = useMutation({
    mutationKey: ["validation-auth"],
    mutationFn: () => authValidation(),
    onSuccess() {
      router.push("/");
    },
  });

  return (
    <ValidationAuthProviderContext.Provider value={{ isLoadingAuthValidation, mutateValidationAuth }}>
      {children}
    </ValidationAuthProviderContext.Provider>
  );
};

export const useValidationAuth = () => useContext(ValidationAuthProviderContext);
