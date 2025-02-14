"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/provider/UserProvider";

interface ModalSignProps {
  sign: string;
}

const loginSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
});

const registerSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
});

type SignInSchemaProps = yup.InferType<typeof loginSchema>;
type SignUpSchemaProps = yup.InferType<typeof registerSchema>;

export default function ModalSign({ sign }: ModalSignProps) {
  const { mutateSignUp, isLoadingUserSignUp, isLoadingUserSignIn, mutateSignIn } = useUser();
  const searchParams = useSearchParams();
  const isOpen = searchParams.has("modal") || false;

  const {
    control: controlLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    control: controlRegister,
    handleSubmit: handleSubmitRegister,
    formState: { errors: errorsRegister },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
      <DialogContent className="transform bg-white backdrop-blur-sm transition-all duration-300 ease-in-out dark:bg-gray-900 sm:w-full sm:max-w-[380px] sm:rounded-lg sm:shadow-xl">
        <DialogHeader className="pb-4 text-center">
          <DialogTitle className="text-xl font-semibold text-gray-800 dark:text-white">Login / Register</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue={sign} className="w-full">
          <TabsList className="mb-4 grid w-full grid-cols-2 gap-4">
            <TabsTrigger
              value="login"
              className="py-1 text-base font-medium text-gray-600 transition-all duration-200 hover:text-[#735ca5] focus:ring-2 focus:ring-[#735ca5] dark:text-gray-300"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="py-1 text-base font-medium text-gray-600 transition-all duration-200 hover:text-[#735ca5] focus:ring-2 focus:ring-[#735ca5] dark:text-gray-300"
            >
              Registrar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleSubmitLogin(onSubmitLogin)} className="space-y-4">
              <Controller
                name="email"
                control={controlLogin}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#735ca5] dark:border-gray-700"
                  />
                )}
              />
              {errorsLogin.email && <p className="text-xs text-red-500">{errorsLogin.email.message}</p>}
              <Button className="w-full rounded-lg bg-[#735ca5] py-3 text-white shadow-md hover:bg-[#735ca5]/90">
                {isLoadingUserSignIn ? (
                  <div className="flex h-full w-full items-center justify-center gap-2">
                    <div
                      className="text-surface inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                      role="status"
                    >
                      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                      </span>
                    </div>

                    <span>Carregando</span>
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleSubmitRegister(onSubmitRegister)} className="space-y-4">
              <Controller
                name="name"
                control={controlRegister}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Nome"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#735ca5] dark:border-gray-700"
                  />
                )}
              />
              {errorsRegister.name && <p className="text-xs text-red-500">{errorsRegister.name.message}</p>}

              <Controller
                name="email"
                control={controlRegister}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#735ca5] dark:border-gray-700"
                  />
                )}
              />
              {errorsRegister.email && <p className="text-xs text-red-500">{errorsRegister.email.message}</p>}

              <Button className="w-full rounded-lg bg-[#735ca5] py-3 text-white shadow-md hover:bg-[#735ca5]/90">
                {isLoadingUserSignUp ? (
                  <div className="flex h-full w-full items-center justify-center gap-2">
                    <div
                      className="text-surface inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                      role="status"
                    >
                      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                      </span>
                    </div>

                    <span>Carregando</span>
                  </div>
                ) : (
                  "Registrar"
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );

  async function onSubmitLogin(data: SignInSchemaProps) {
    await mutateSignIn(data.email);
  }

  async function onSubmitRegister(data: SignUpSchemaProps) {
    const aux = {
      ...data,
      roles: [] as Role[],
    };
    await mutateSignUp(aux);
  }

  function handleModalClose() {
    const url = new URL(window.location.href);
    url.searchParams.delete("modal");
    window.history.pushState({}, "", url.toString());
  }
}
