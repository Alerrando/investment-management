import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { authValidation } from "@/api/authValidation";

interface ValidationAuthState {
  isLoadingAuthValidation: boolean;
  setIsLoadingAuthValidation: (loading: boolean) => void;
}

const useValidationAuthStore = create<ValidationAuthState>()(
  persist(
    (set) => ({
      isLoadingAuthValidation: false,
      setIsLoadingAuthValidation: (loading) => set({ isLoadingAuthValidation: loading }),
    }),
    {
      name: "validationAuth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export function useValidationAuth() {
  const { setIsLoadingAuthValidation } = useValidationAuthStore();
  const router = useRouter();

  const { isLoading, error } = useQuery({
    queryKey: ["validation-auth"],
    queryFn: () => authValidation(),
    onSuccess: () => {
      toast.success("Autenticação validada com sucesso! Redirecionando...", {
        closeOnClick: true,
        autoClose: 2000,
      });

      setTimeout(() => router.push("/"), 1000);
    },
    onError: (err) => {
      console.error(err);
      setIsLoadingAuthValidation(false);
    },
    onSettled: () => {
      setIsLoadingAuthValidation(isLoading);
    },
  });

  return { isLoading, error };
}
