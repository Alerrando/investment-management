import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "../ui/button";
import { ModeToggle } from "../ui/mode-toggle";
import ModalSign from "./ModalSign/ModalSign";

export default function Header() {
  const [open, setOpen] = useState({
    modal: false,
    sign: "",
  });

  return (
    <header className="sticky top-0 z-10 flex w-full items-center justify-between border-b border-b-[#9265E2] bg-white px-8 py-2 dark:border-b-[#9265E2]/70 dark:bg-gray-900">
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

        <div className="flex gap-6">
          <Button
            variant="default"
            className="h-auto bg-white px-6 py-1 font-semibold text-black shadow-md hover:bg-white hover:opacity-90"
            onClick={() => setOpen({ ...open, modal: true, sign: "login" })}
          >
            Login
          </Button>

          <Button
            variant="default"
            className="h-auto rounded-lg border border-transparent bg-[#735ca5] px-6 py-1 font-semibold text-white shadow-lg hover:bg-[#735ca5] hover:opacity-90"
            onClick={() => setOpen({ ...open, modal: true, sign: "register" })}
          >
            Register
          </Button>
        </div>
      </div>

      {open.modal && <ModalSign open={open} setOpen={setOpen} />}
    </header>
  );
}
