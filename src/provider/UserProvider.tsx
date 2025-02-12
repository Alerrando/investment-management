"use client";

import { useMutation } from "@tanstack/react-query";
import React, { createContext, useContext, useState } from "react";

import { signIn, SignInProps } from "@/api/sign-in";
import { signUp, SignUpProps } from "@/api/sign-up";
import { UserModel } from "@/models/UserModel";

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
  const [dataUser, setDataUser] = useState<UserModel[]>([] as UserModel[]);

  const { isLoading: isLoadingUserSignIn, mutateAsync: mutateSignIn } = useMutation({
    mutationKey: ["query-sign-in"],
    mutationFn: (data: SignInProps) => signIn(data),
    onSuccess(data) {
      setDataUser(data);
    },
  });

  const { isLoading: isLoadingUserSignUp, mutateAsync: mutateSignUp } = useMutation({
    mutationKey: ["query-sign-up"],
    mutationFn: (data: SignUpProps) => signUp(data),
    onSuccess(data) {
      setDataUser(data);
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
