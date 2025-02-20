"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Role } from "@/models/UserModel";
import { useUser } from "@/provider/UserProvider";

import { Button } from "../ui/button";
import { ModeToggle } from "../ui/mode-toggle";
import ModalSign from "./ModalSign/ModalSign";

export default function Header() {
  const [sign, setSign] = useState<string>("login");
  const { dataUser, setDataUser } = useUser();

  function openModal(type: string) {
    const url = new URL(window.location.href);
    url.searchParams.set("modal", type);
    window.history.pushState({}, "", url.toString());
    setSign(type);
  }

  return (
    <header className="sticky top-0 z-40 flex w-full items-center justify-between border-b border-b-[#9265E2] bg-white px-8 py-2 dark:border-b-[#9265E2]/70 dark:bg-gray-900">
      <div className="relative h-8 w-8 rounded-full">
        <Image src="/logo.jpg" alt="logo" className="rounded-full" fill />
      </div>

      <ul className="flex gap-11">
        <li className="list-none font-semibold">
          <Link href="/">Home</Link>
        </li>
        <li className="list-none font-semibold">
          <Link href="/investment-planner">Planejador de Investimentos</Link>
        </li>
        <li className="list-none font-semibold">Ações</li>
        <li className="list-none font-semibold">FIIs</li>
        <li className="list-none font-semibold">Cripto</li>
      </ul>

      <div className="flex gap-9">
        <ModeToggle />

        {dataUser.email.length > 0 ? (
          <div className="flex items-center gap-4">
            <span className="font-semibold text-black dark:text-white">Bem-vindo, {dataUser.name}</span>

            <Button
              variant="destructive"
              className="h-auto bg-red-600 px-6 py-1 font-semibold text-white shadow-md hover:bg-red-700 hover:opacity-90"
              onClick={() => handleLogout()}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex gap-6">
            <Button
              variant="default"
              className="h-auto bg-white px-6 py-1 font-semibold text-black shadow-md hover:bg-white hover:opacity-90"
              onClick={() => openModal("login")}
            >
              Login
            </Button>

            <Button
              variant="default"
              className="h-auto rounded-lg border border-transparent bg-[#735ca5] px-6 py-1 font-semibold text-white shadow-lg hover:bg-[#735ca5] hover:opacity-90"
              onClick={() => openModal("register")}
            >
              Register
            </Button>
          </div>
        )}
      </div>

      <ModalSign sign={sign} />
    </header>
  );

  function handleLogout() {
    localStorage.removeItem("user-storage");
    const userDefault = {
      id: 0,
      email: "",
      name: "",
      roles: [] as Role[],
    };
    setDataUser(userDefault);
  }
}
