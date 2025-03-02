"use client";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useMemo, useState } from "react";

import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useListStocksByDividend } from "@/provider/Lists/ListStockBy/ListStockByDividendProvider";

import SkeletonCategories from "../../../Categories/SkeletonCategories";

export default function TableDividend() {
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const { dataListStocksByDividend } = useListStocksByDividend();

  const sortedStocks = useMemo(() => {
    if (!sortConfig.key) return dataListStocksByDividend.content;

    const sortedData = [...dataListStocksByDividend.content];
    sortedData.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return sortedData;
  }, [sortConfig, dataListStocksByDividend.content]);

  return (
    <div className="z-30 min-w-[300px] flex-1 transform rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg transition-all hover:shadow-xl dark:border-[#444444] dark:from-[#2C2C2C] dark:to-[#1E1E1E]">
      <header className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Ações que mais pagam dividendos</h2>
      </header>
      <div className="h-[350px] overflow-y-auto">
        <Table className="min-w-full table-auto">
          <TableHeader>
            <TableRow className="border-b-2 border-b-gray-100 dark:border-b-[#444444]">
              <TableHead className="px-0" onClick={() => requestSort("paper")}>
                <div className="flex cursor-pointer items-center gap-2 py-3 font-semibold">
                  Ação
                  {sortConfig.key === "paper" &&
                    (sortConfig.direction === "asc" ? <ArrowDown size={12} /> : <ArrowUp size={12} />)}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer px-0 font-semibold" onClick={() => requestSort("dividend")}>
                <div className="flex cursor-pointer items-center gap-2 py-3 font-semibold">
                  Dividendo
                  {sortConfig.key === "dividend" &&
                    (sortConfig.direction === "asc" ? <ArrowDown size={12} /> : <ArrowUp size={12} />)}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer px-0 font-semibold" onClick={() => requestSort("quotation")}>
                <div className="flex cursor-pointer items-center gap-2 py-3 font-semibold">
                  Cotação
                  {sortConfig.key === "quotation" &&
                    (sortConfig.direction === "asc" ? <ArrowDown size={12} /> : <ArrowUp size={12} />)}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer py-3 font-semibold" onClick={() => requestSort("pl")}>
                <div className="flex cursor-pointer items-center gap-2 py-3 font-semibold">
                  P/L
                  {sortConfig.key === "pl" &&
                    (sortConfig.direction === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                </div>
              </TableHead>
              <TableHead className="px-0 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">P/VP</TableHead>
              <TableHead className="px-0 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">PSR</TableHead>
              <TableHead className="px-0 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                P/Ativo
              </TableHead>
              <TableHead className="px-0 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                P/Capital de Giro
              </TableHead>
              <TableHead className="px-0 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Valor de Mercado
              </TableHead>
            </TableRow>
          </TableHeader>
          <tbody>
            {dataListStocksByDividend.content.length > 0 ? (
              <>
                {sortedStocks.map((stock, index) => (
                  <TableRow
                    key={index}
                    className="border-b-2 border-b-gray-100 transition-colors duration-300 hover:bg-gray-50 dark:border-b-[#555] dark:hover:bg-[#444444]"
                  >
                    <td className="py-4 text-sm font-medium text-gray-900 dark:text-white">{stock.paper}</td>
                    <td className="py-4 text-sm text-gray-700 dark:text-gray-300">{stock.dividend}</td>
                    <td className="py-4 text-sm text-gray-700 dark:text-gray-300">{stock.quotation}</td>
                    <td className="py-4 text-sm text-gray-700 dark:text-gray-300">{stock.pL}</td>
                    <td className="py-4 text-sm text-gray-700 dark:text-gray-300">{stock.pVp}</td>
                    <td className="py-4 text-sm text-gray-700 dark:text-gray-300">{stock.psr}</td>
                    <td className="py-4 text-sm text-gray-700 dark:text-gray-300">{stock.pActive}</td>
                    <td className="py-4 text-sm text-gray-700 dark:text-gray-300">{stock.pWorkCapital}</td>
                    <td className="py-4 text-sm text-gray-700 dark:text-gray-300">
                      {formatMarketCap(stock.marketValue)}
                    </td>
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

  function formatMarketCap(value: string | number): string {
    const numericValue = typeof value === "string" ? parseFloat(value.replace(/\./g, "")) : value;

    if (isNaN(numericValue)) {
      return "Invalid value";
    }

    if (numericValue >= 1e12) {
      return `${(numericValue / 1e12).toFixed(2)}T`;
    } else if (numericValue >= 1e9) {
      return `${(numericValue / 1e9).toFixed(2)}B`;
    } else if (numericValue >= 1e6) {
      return `${(numericValue / 1e6).toFixed(2)}M`;
    } else {
      return numericValue.toLocaleString();
    }
  }
}
