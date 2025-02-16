"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { signIn } from "@/api/sign-in";
import { signUp, SignUpProps } from "@/api/sign-up";
import { ReturnResponseUser, Role, UserModel } from "@/models/UserModel";

interface UserState {
  dataUser: UserModel;
  isLoadingUserSignIn: boolean;
  isLoadingUserSignUp: boolean;
  waitingAuth: boolean;
  setDataUser: (data: UserModel) => void;
  setIsLoadingUserSignIn: (loading: boolean) => void;
  setIsLoadingUserSignUp: (loading: boolean) => void;
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
      isLoadingUserSignIn: false,
      isLoadingUserSignUp: false,
      waitingAuth: false,
      setDataUser: (data) => set({ dataUser: data }),
      setIsLoadingUserSignIn: (loading) => set({ isLoadingUserSignIn: loading }),
      setIsLoadingUserSignUp: (loading) => set({ isLoadingUserSignUp: loading }),
      setWaitingAuth: (waitingAuth) => set({ waitingAuth }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export function useUser() {
  const {
    dataUser,
    isLoadingUserSignIn,
    isLoadingUserSignUp,
    waitingAuth,
    setDataUser,
    setIsLoadingUserSignIn,
    setIsLoadingUserSignUp,
    setWaitingAuth,
  } = useUserStore();

  const { mutateAsync: mutateSignIn } = useMutation({
    mutationKey: ["query-sign-in"],
    mutationFn: (data: string) => signIn(data),
    onMutate() {
      setIsLoadingUserSignIn(true);
    },
    onSuccess(data: ReturnResponseUser) {
      setDataUser(data.user);
      setWaitingAuth(true);
      setIsLoadingUserSignIn(false);
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
      setIsLoadingUserSignIn(false);
      toast.error(`Erro ao fazer login!`, {
        closeOnClick: true,
      });
    },
  });

  const { mutateAsync: mutateSignUp } = useMutation({
    mutationKey: ["query-sign-up"],
    mutationFn: (data: SignUpProps) => signUp(data),
    onMutate() {
      setIsLoadingUserSignUp(true);
    },
    onSuccess(data: ReturnResponseUser) {
      setDataUser(data.user);
      setIsLoadingUserSignUp(false);
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
      setIsLoadingUserSignUp(false);
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
