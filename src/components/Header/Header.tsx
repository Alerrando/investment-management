import Link from "next/link";
import { useState } from "react";

import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { ModeToggle } from "../ui/mode-toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 flex w-full items-center justify-between border-b border-b-[#9265E2] bg-white px-8 py-2 dark:border-b-[#9265E2]/70 dark:bg-gray-900">
      <div className="h-6 w-6 rounded-full bg-gray-600"></div>

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
            onClick={() => setOpen(true)}
          >
            Login
          </Button>

          <Button
            variant="default"
            className="h-auto rounded-lg border border-transparent bg-[#735ca5] px-6 py-1 font-semibold text-white shadow-lg hover:bg-[#735ca5] hover:opacity-90"
          >
            Register
          </Button>
        </div>
      </div>

      {open && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="transform bg-white backdrop-blur-sm transition-all duration-300 ease-in-out dark:bg-gray-900 sm:w-full sm:max-w-[380px] sm:rounded-lg sm:shadow-xl">
            <DialogHeader className="pb-4 text-center">
              <DialogTitle className="text-xl font-semibold text-gray-800 dark:text-white">
                Login / Register
              </DialogTitle>
            </DialogHeader>

            <Tabs defaultValue="login" className="w-full">
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
                  Register
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#735ca5] dark:border-gray-700"
                />
                <Button className="w-full rounded-lg bg-[#735ca5] py-3 text-white shadow-md hover:bg-[#735ca5]/90">
                  Login
                </Button>
              </TabsContent>

              <TabsContent value="register" className="space-y-4">
                <Input
                  type="text"
                  placeholder="Nome"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#735ca5] dark:border-gray-700"
                />
                <Input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#735ca5] dark:border-gray-700"
                />
                <Button className="w-full rounded-lg bg-[#735ca5] py-3 text-white shadow-md hover:bg-[#735ca5]/90">
                  Register
                </Button>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </header>
  );
}
