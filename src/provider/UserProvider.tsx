"use client";

import { useMutation } from "@tanstack/react-query";
import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

import { signIn } from "@/api/sign-in";
import { signUp, SignUpProps } from "@/api/sign-up";
import { ReturnResponseUser, UserModel } from "@/models/UserModel";

interface ContextProps {
  dataUser: UserModel;
  isLoadingUserSignIn: boolean;
  mutateSignIn: (data: string) => Promise<ReturnResponseUser>;
  isLoadingUserSignUp: boolean;
  mutateSignUp: (data: UserModel) => Promise<ReturnResponseUser>;
  waitingAuth: boolean;
  setWaitingAuth: (waitingAuth: boolean) => void;
}

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProviderContext = createContext<ContextProps>({} as ContextProps);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [dataUser, setDataUser] = useState<UserModel>({
    id: 0,
    email: "",
    name: "",
    roles: [] as UserModel[],
  });
  const [waitingAuth, setWaitingAuth] = useState(false);

  const { isLoading: isLoadingUserSignIn, mutateAsync: mutateSignIn } = useMutation({
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

  const { isLoading: isLoadingUserSignUp, mutateAsync: mutateSignUp } = useMutation({
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

  return (
    <UserProviderContext.Provider
      value={{
        dataUser,
        isLoadingUserSignIn,
        mutateSignIn,
        isLoadingUserSignUp,
        mutateSignUp,
        waitingAuth,
        setWaitingAuth,
      }}
    >
      {children}
    </UserProviderContext.Provider>
  );
};

export const useUser = () => useContext(UserProviderContext);
