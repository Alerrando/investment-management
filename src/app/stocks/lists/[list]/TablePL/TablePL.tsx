"use client";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useMemo, useState } from "react";

import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useListStocksByPL } from "@/provider/Lists/ListStockBy/ListStockByPlProvider";

import SkeletonCategories from "../../../Categories/SkeletonCategories";

export default function TablePL() {
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const { dataListStocksByPL } = useListStocksByPL();

  const sortCofig = useMemo(() => {
    if (!sortConfig.key) return dataListStocksByPL.content;

    const sortedData = [...dataListStocksByPL.content];
    sortedData.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return sortedData;
  }, [sortConfig, dataListStocksByPL.content]);

  return (
    <div className="z-30 min-w-[300px] flex-1 transform rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg transition-all hover:shadow-xl dark:border-[#444444] dark:from-[#2C2C2C] dark:to-[#1E1E1E]">
      <header className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Ações com maior P/L</h2>
      </header>

      <div className="h-[350px] overflow-y-auto">
        <Table className="min-w-full table-auto">
          <TableHeader>
            <TableRow className="border-b-2 border-b-gray-100 dark:border-b-[#444444]">
              <TableHead className="px-0" onClick={() => requestSort("paper")}>
                <div className="flex cursor-pointer items-center gap-2 py-3 font-semibold">
                  Ação
                  {sortConfig.key === "paper" &&
                    (sortConfig.direction === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                </div>
              </TableHead>
              <TableHead className="px-0" onClick={() => requestSort("pL")}>
                <div className="flex cursor-pointer items-center gap-2 py-3 font-semibold">
                  P/L
                  {sortConfig.key === "pL" &&
                    (sortConfig.direction === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                </div>
              </TableHead>
              <TableHead className="px-0" onClick={() => requestSort("quotation")}>
                <div className="flex cursor-pointer items-center gap-2 py-3 font-semibold">
                  Cotação
                  {sortConfig.key === "quotation" &&
                    (sortConfig.direction === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                </div>
              </TableHead>
              <TableHead className="px-0" onClick={() => requestSort("dividend")}>
                <div className="flex cursor-pointer items-center gap-2 py-3 font-semibold">
                  Dividendo
                  {sortConfig.key === "dividend" &&
                    (sortConfig.direction === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                </div>
              </TableHead>
              <TableHead className="px-0" onClick={() => requestSort("pVp")}>
                <div className="flex cursor-pointer items-center gap-2 py-3 font-semibold">
                  P/VP
                  {sortCofig.key === "pVp" &&
                    (sortConfig.direction === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                </div>
              </TableHead>
              <TableHead className="px-0" onClick={() => requestSort("psr")}>
                <div className="flex cursor-pointer items-center gap-2 py-3 font-semibold">
                  PSR
                  {sortConfig.key === "psr" &&
                    (sortConfig.direction === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                </div>
              </TableHead>
              <TableHead className="px-0" onClick={() => requestSort("roe")}>
                <div className="flex cursor-pointer items-center gap-2 py-3 font-semibold">
                  ROE
                  {sortConfig.key === "roe" &&
                    (sortConfig.direction === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                </div>
              </TableHead>
              <TableHead className="px-0" onClick={() => requestSort("pActive")}>
                <div className="flex cursor-pointer items-center gap-2 py-3 font-semibold">
                  P/Ativo
                  {sortConfig.key === "pActive" &&
                    (sortConfig.direction === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <tbody>
            {dataListStocksByPL.content.length > 0 ? (
              <>
                {sortCofig.slice(0, 8).map((stock, index) => (
                  <TableRow
                    key={index}
                    className="border-b-2 border-b-gray-100 transition-colors duration-300 hover:bg-gray-50 dark:border-b-[#555] dark:hover:bg-[#444444]"
                  >
                    <td className="py-4 text-sm font-medium text-gray-900 dark:text-white">{stock.paper}</td>
                    <td className="py-4 text-sm text-gray-700 dark:text-gray-300">{stock.pL}</td>
                    <td className="py-4 text-sm text-gray-700 dark:text-gray-300">R$ {stock.quotation}</td>
                    <td className="py-4 text-sm text-gray-700 dark:text-gray-300">{stock.dividend}</td>
                    <td className="py-4 text-sm text-gray-700 dark:text-gray-300">{stock.pVp}</td>
                    <td className="py-4 text-sm text-gray-700 dark:text-gray-300">{stock.psr}</td>
                    <td className="py-4 text-sm text-gray-700 dark:text-gray-300">{stock.roe}</td>
                    <td className="py-4 text-sm text-gray-700 dark:text-gray-300">{stock.pActive}</td>
                  </TableRow>
                ))}
              </>
            ) : (
              <SkeletonCategories quantity={6} />
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );

  function requestSort(key: string) {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  }
}
