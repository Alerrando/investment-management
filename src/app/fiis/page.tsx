"use client";

import { AlignLeft, LayoutDashboard, Medal } from "lucide-react";
import { useState } from "react";

import Title from "@/components/Title/Title";

import Categories from "./Categories/Categories";
import ListFiis from "./ListFiis/ListFiis";

export default function AllFiisPage() {
  const [order, setOrder] = useState<"categories" | "list">("categories");

  return (
    <div className="flex h-auto flex-col gap-8 border px-8 py-8">
      <Title name="Todos os Fiis" icon={<Medal size={20} className="text-indigo-600" />} />

      <div className="flex gap-2">
        <div
          className={`cursor-pointer rounded-lg ${order === "categories" && "bg-tertiary text-background"} p-2 text-primary-t`}
          onClick={() => setOrder("categories")}
        >
          <LayoutDashboard size={20} />
        </div>

        <div
          className={`cursor-pointer rounded-lg ${order === "list" && "bg-tertiary text-background"} p-2 text-primary-t`}
          onClick={() => setOrder("list")}
        >
          <AlignLeft size={20} />
        </div>
      </div>

      <div className="flex flex-col gap-2">{order === "categories" ? <Categories /> : <ListFiis />}</div>
    </div>
  );
}
