"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { ReturnResponseUser, Role, UserModel } from "@/models/UserModel";

import { signIn } from "../app/api/sign-in";
import { signUp, SignUpProps } from "../app/api/sign-up";

interface UserState {
  dataUser: UserModel;
  waitingAuth: boolean;
  setDataUser: (data: UserModel) => void;
  setWaitingAuth: (waitingAuth: boolean) => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      dataUser: {
        id: 0,
        email: "",
        name: "",
        roles: [] as Role[],
      },
      waitingAuth: false,
      setDataUser: (data) => set({ dataUser: data }),
      setWaitingAuth: (waitingAuth) => set({ waitingAuth }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export function useUser() {
  const { dataUser, waitingAuth, setDataUser, setWaitingAuth } = useUserStore();

  const { mutateAsync: mutateSignIn, isLoading: isLoadingUserSignIn } = useMutation({
    mutationKey: ["query-sign-in"],
    mutationFn: (data: string) => signIn(data),
    onSuccess(data: ReturnResponseUser) {
      setDataUser(data.user);
      setWaitingAuth(true);
      toast.success(
        <div className="flex flex-col">
          <h2 className="text-sm font-semibold">Enviamos um link de autenticação para seu e-mail</h2>
          <span className="text-sm text-gray-400">Verifique seu e-mail para acessar sua conta!</span>
        </div>,
        {
          closeOnClick: true,
          autoClose: 2000,
        },
      );
    },
    onError() {
      toast.error(`Erro ao fazer login!`, {
        closeOnClick: true,
      });
    },
  });

  const { mutateAsync: mutateSignUp, isLoading: isLoadingUserSignUp } = useMutation({
    mutationKey: ["query-sign-up"],
    mutationFn: (data: SignUpProps) => signUp(data),
    onSuccess(data: ReturnResponseUser) {
      setDataUser(data.user);
      toast.success(
        <div className="flex flex-col">
          <h2 className="font-semibold">Usuário criado com sucesso!</h2>
          <span className="text-sm text-gray-400">Já pode usar o site.</span>
        </div>,
        {
          closeOnClick: true,
        },
      );
    },
    onError(error: ReturnResponseUser) {
      toast.error(`${error.message}`, {
        closeOnClick: true,
      });
    },
  });

  return {
    dataUser,
    setDataUser,
    isLoadingUserSignIn,
    isLoadingUserSignUp,
    waitingAuth,
    setWaitingAuth,
    mutateSignIn,
    mutateSignUp,
  };
}
