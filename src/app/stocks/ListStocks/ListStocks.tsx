"use client";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ChartCandlestick } from "lucide-react";
import { useState } from "react";

import { TableCell } from "@/components/ui/table";
import { useListStocks } from "@/provider/Lists/ListStockProvider";

import SkeletonListStock from "./SkeletonListStock";

export default function ListStocks() {
  const { dataListStocks } = useListStocks();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  return (
    <>
      <div className="h-[400px] w-full overflow-auto">
        <table className="h-full w-full table-auto border-collapse text-left text-sm text-gray-600 dark:text-gray-300">
          <thead className="sticky top-0 z-10 bg-gray-800 text-white dark:bg-gray-900">
            <tr>
              <th onClick={() => requestSort("paper")}>
                <div className="flex cursor-pointer items-center gap-2 px-5 py-3 font-semibold">
                  Nome{" "}
                  {sortConfig.key === "paper" &&
                    (sortConfig.direction === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                </div>
              </th>
              <th className="cursor-pointer py-3 font-semibold" onClick={() => requestSort("quotation")}>
                <div className="flex cursor-pointer items-center gap-2 px-6 py-3 font-semibold">
                  Cotação{" "}
                  {sortConfig.key === "quotation" &&
                    (sortConfig.direction === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                </div>
              </th>
              <th className="cursor-pointer py-3 font-semibold" onClick={() => requestSort("pL")}>
                <div className="flex cursor-pointer items-center gap-2 px-6 py-3 font-semibold">
                  P/L{" "}
                  {sortConfig.key === "pL" &&
                    (sortConfig.direction === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                </div>
              </th>
              <th className="px-6 py-3 text-left font-semibold">P/VP</th>
              <th className="px-6 py-3 text-left font-semibold">PSR</th>
              <th className="px-4 py-3 text-left font-semibold">Dividend Yield</th>
              <th className="px-6 py-3 text-left font-semibold">P/Ativo</th>
              <th className="px-6 py-3 text-left font-semibold">P/Capital de Giro</th>
            </tr>
          </thead>

          <tbody>
            {dataListStocks.content.length > 0 ? (
              dataListStocks.content.map((stock, index) => (
                <tr
                  key={index}
                  className="border-b border-b-[#F2F2F2] p-2 transition-colors hover:bg-[#F2F2F2] dark:border-b-[#555] dark:hover:bg-[#444444]"
                >
                  <TableCell className="pl-4">
                    <div className="flex items-center gap-2">
                      <ChartCandlestick className="h-8 w-8 text-indigo-600" />
                      <div className="flex flex-col py-2">
                        <h2 className="text-sm font-medium text-gray-800 dark:text-gray-200">{stock.paper}</h2>
                      </div>
                    </div>
                  </TableCell>

                  <td className="whitespace-nowrap px-6 py-4 text-left text-gray-800 dark:text-white">
                    R$ {parseFloat(stock.quotation).toFixed(2)}
                  </td>

                  <td className="px-6 py-4 text-left">{parseFloat(stock.pL).toFixed(2)}</td>

                  <td className="px-6 py-4 text-left">{parseFloat(stock.pVp).toFixed(2)}</td>

                  <td className="px-6 py-4 text-left">{parseFloat(stock.psr).toFixed(2)}</td>

                  <TableCell className="pl-4">
                    <div className="flex w-fit flex-col items-end">
                      <span className="font-semibold text-green-500">{stock.dividend}</span>
                    </div>
                  </TableCell>

                  <td className="px-6 py-4 text-left">{parseFloat(stock.pActive).toFixed(2)}</td>

                  <td className="px-6 py-4 text-left">{parseFloat(stock.pWorkCapital).toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <SkeletonListStock />
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-end gap-4 py-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="flex items-center justify-center rounded-md bg-gray-800 p-2 text-white hover:bg-gray-700 disabled:opacity-50"
        >
          <ArrowLeft size={16} />
        </button>

        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Página {currentPage} de {dataListStocks.totalPages}
        </span>

        <button
          disabled={currentPage === dataListStocks.totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="flex items-center justify-center rounded-md bg-gray-800 p-2 text-white hover:bg-gray-700 disabled:opacity-50"
        >
          <ArrowRight size={16} />
        </button>
      </div>
    </>
  );

  function requestSort(key: string) {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  }
}
