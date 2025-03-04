"use client";
import { Medal } from "lucide-react";
import { useParams } from "next/navigation";

import Title from "@/components/Title/Title";

import SkeletonCategories from "../../Categories/SkeletonCategories";
import TableDividend from "./TableDividend/TableDividend";
import TableLiquidAverage from "./TableLiquidAverage/TableLiquidAverage";
import TableMarketValue from "./TableMarketValue/TableMarketValue";
import TablePL from "./TablePL/TablePL";
import TableRevenueGrowth from "./TableRevenueGrowth/TableRevenueGrowth";
import TableROE from "./TableROE/TableROE";

export default function ListPage() {
  const { list } = useParams();

  return (
    <div className="flex h-auto flex-col gap-8 px-8 pt-8">
      <Title name="Todos os Stocks" icon={<Medal size={20} className="text-indigo-600" />} />

      {list === "dividend" ? (
        <TableDividend />
      ) : list === "liquid-average" ? (
        <TableLiquidAverage />
      ) : list === "revenue-growth" ? (
        <TableRevenueGrowth />
      ) : list === "market-value" ? (
        <TableMarketValue />
      ) : list === "pl" ? (
        <TablePL />
      ) : list === "roe" ? (
        <TableROE />
      ) : (
        <SkeletonCategories />
      )}
    </div>
  );
}
