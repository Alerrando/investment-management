"use client";

import { Lightbulb, Loader2, Rocket, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useUser } from "@/provider/UserProvider";
import { useValidationAuth } from "@/provider/ValidationAuthProvider";

export default function Magic() {
  const router = useRouter();
  const { waitingAuth, isAuthenticated } = useUser();
  const { mutateValidationAuth } = useValidationAuth();

  useEffect(() => {
    if (waitingAuth) {
      mutateValidationAuth();
      simulateProgress();
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 p-8">
      <div className="flex w-full max-w-4xl flex-col items-center gap-8 rounded-lg bg-gray-800 p-8 shadow-lg">
        <div className="flex h-full w-full items-center justify-center gap-2">
          <div
            className="text-surface inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>

          <span>Carregando</span>
        </div>
        <h1 className="text-3xl font-bold text-white">Aguarde um momento...</h1>
        <p className="text-center text-gray-300">
          Estamos validando suas informações para garantir a segurança da sua conta.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col items-center gap-2 rounded-lg bg-gray-700 p-4">
            <ShieldAlert className="h-8 w-8 text-[#735ca5]" />
            <p className="text-center text-sm text-gray-300">Sua segurança é nossa prioridade.</p>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-lg bg-gray-700 p-4">
            <Lightbulb className="h-8 w-8 text-[#735ca5]" />
            <p className="text-center text-sm text-gray-300">Dicas: Mantenha suas credenciais seguras.</p>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-lg bg-gray-700 p-4">
            <Rocket className="h-8 w-8 text-[#735ca5]" />
            <p className="text-center text-sm text-gray-300">Você será redirecionado automaticamente.</p>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-[#735ca5]" />
          <p className="text-gray-300">Validando autenticação...</p>
        </div>
      </div>
    </div>
  );
}
