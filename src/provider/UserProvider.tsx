"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

import { signIn, SignInProps } from "@/api/sign-in";
import { signUp, SignUpProps } from "@/api/sign-up";
import { ReturnResponseUser, UserModel } from "@/models/UserModel";

interface ContextProps {
  dataUser: UserModel[];
  isLoadingUserSignIn: boolean;
  mutateSignIn: (data: SignInProps) => Promise<void>;
  isLoadingUserSignUp: boolean;
  mutateSignUp: (data: SignUpProps) => Promise<void>;
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

  const { isLoading: isLoadingUserSignIn, mutateAsync: mutateSignIn } = useMutation({
    mutationKey: ["query-sign-in"],
    mutationFn: (data: SignInProps) => signIn(data),
    onSuccess(data: ReturnResponseUser) {
      setDataUser(data.user);

      toast.success(
        <div className="align-items flex justify-between">
          <div className="flex flex-col"></div>
          <h2 className="font-semibold">Usuário logado com sucesso!</h2>
          <span className="text-sm text-gray-400">Já pode usar o site.</span>

          <div className="flex flex-col">
            <h2 className="font-semibold">Para acessar a sua conta, clique no link que foi enviado para seu email!</h2>
            <Link href={data.message} className="rounded-lg bg-green-600 px-2 py-1 text-white">
              Ou clique aqui
            </Link>
          </div>
        </div>,
        {
          closeOnClick: true,
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
      value={{ dataUser, isLoadingUserSignIn, mutateSignIn, isLoadingUserSignUp, mutateSignUp }}
    >
      {children}
    </UserProviderContext.Provider>
  );
};

export const useUser = () => useContext(UserProviderContext);
