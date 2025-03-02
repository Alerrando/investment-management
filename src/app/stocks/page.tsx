"use client";
import { AlignLeft, LayoutDashboard, Medal } from "lucide-react";
import { useState } from "react";

import Title from "@/components/Title/Title";

import Categories from "./Categories/Categories";
import ListStocks from "./ListStocks/ListStocks";

export default function AllStocksPage() {
  const [order, setOrder] = useState<"categories" | "list">("categories");

  return (
    <div className="flex h-auto flex-col gap-8 border px-8 pt-8">
      <Title name="Todos os Stocks" icon={<Medal size={20} className="text-indigo-600" />} />

      <div className="flex gap-2">
        <div
          className={`cursor-pointer rounded-lg ${order === "categories" && "bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-600/50"} p-2`}
          onClick={() => setOrder("categories")}
        >
          <LayoutDashboard size={20} />
        </div>

        <div
          className={`cursor-pointer rounded-lg ${order === "list" && "bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-600/50"} p-2`}
          onClick={() => setOrder("list")}
        >
          <AlignLeft size={20} />
        </div>
      </div>

      <div className="flex flex-col gap-2">{order === "categories" ? <Categories /> : <ListStocks />}</div>
    </div>
  );
}
