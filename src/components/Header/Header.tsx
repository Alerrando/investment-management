"use client";
import { Menu, X } from "lucide-react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { dataUser, setDataUser } = useUser();

  function openModal(type: string) {
    const url = new URL(window.location.href);
    url.searchParams.set("modal", type);
    window.history.pushState({}, "", url.toString());
    setSign(type);
  }

  return (
    <header className="sticky top-0 z-40 flex w-full items-center justify-between border-b border-b-[#9265E2] bg-background px-4 py-2 md:px-8">
      <div className="relative h-8 w-8 rounded-full">
        <Image src="/logo.jpg" alt="logo" className="rounded-full" fill />
      </div>

      <div
        className={`fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 md:hidden ${isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={`fixed left-0 top-0 z-40 h-full w-64 bg-background transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex h-full flex-col gap-6 p-6">
            <ul className="flex flex-col gap-6">
              <li className="list-none font-semibold">
                <Link className="cursor-pointer text-primary-t" href="/" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li className="list-none font-semibold">
                <Link
                  className="cursor-pointer text-primary-t"
                  href="/investment-planner"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Planejador de Investimentos
                </Link>
              </li>
              <li className="list-none font-semibold">
                <Link className="cursor-pointer text-primary-t" href="/stocks" onClick={() => setIsMenuOpen(false)}>
                  Ações
                </Link>
              </li>
              <li className="list-none font-semibold">
                <Link className="cursor-pointer text-primary-t" href="/fiis" onClick={() => setIsMenuOpen(false)}>
                  Fiis
                </Link>
              </li>
              <li className="list-none font-semibold text-primary-t">Cripto</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:hidden">
        <ModeToggle />
        <button className="text-primary-t" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <ul className="hidden gap-11 md:flex">
        <li className="list-none font-semibold">
          <Link className="text-primary-t" href="/">
            Home
          </Link>
        </li>
        <li className="list-none font-semibold">
          <Link className="text-primary-t" href="/investment-planner">
            Planejador de Investimentos
          </Link>
        </li>
        <li className="list-none font-semibold">
          <Link className="text-primary-t" href="/stocks">
            Ações
          </Link>
        </li>
        <li className="list-none font-semibold">
          <Link className="text-primary-t" href="/fiis">
            Fiis
          </Link>
        </li>
        <li className="list-none font-semibold text-primary-t">Cripto</li>
      </ul>

      <div className="hidden items-center gap-4 md:flex">
        <ModeToggle />

        {dataUser.email.length > 0 ? (
          <div className="hidden items-center gap-4 md:flex">
            <span className="font-semibold text-black dark:text-white">Bem-vindo, {dataUser.name}</span>
            <Button
              variant="destructive"
              className="boder-border h-auto bg-red-600 px-6 py-1 font-semibold text-white shadow-md hover:bg-red-700 hover:opacity-90"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="hidden gap-6 md:flex">
            <Button
              variant="default"
              className="h-auto border-border bg-white px-6 py-1 font-semibold text-black shadow-md hover:bg-white hover:opacity-90"
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
