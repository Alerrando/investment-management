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
        <table className="w-full table-auto border-collapse text-left text-sm">
          <thead className="sticky top-0 z-10 bg-primary">
            <tr>
              <th onClick={() => requestSort("paper")}>
                <div className="flex cursor-pointer items-center gap-2 px-6 py-3 font-semibold text-foreground">
                  Nome{" "}
                  {sortConfig.key === "paper" &&
                    (sortConfig.direction === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                </div>
              </th>
              <th className="py-3" onClick={() => requestSort("quotation")}>
                <div className="flex cursor-pointer items-center gap-2 px-6 py-3 font-semibold text-foreground">
                  Cotação{" "}
                  {sortConfig.key === "quotation" &&
                    (sortConfig.direction === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                </div>
              </th>
              <th className="cursor-pointer py-3 font-semibold" onClick={() => requestSort("pL")}>
                <div className="flex cursor-pointer items-center gap-2 px-6 py-3 font-semibold text-foreground">
                  P/L{" "}
                  {sortConfig.key === "pL" &&
                    (sortConfig.direction === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                </div>
              </th>
              <th className="cursor-pointer py-3 font-semibold" onClick={() => requestSort("pVp")}>
                <div className="flex cursor-pointer items-center gap-2 px-6 py-3 font-semibold text-foreground">
                  P/VP{" "}
                  {sortConfig.key === "pVp" &&
                    (sortConfig.direction === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                </div>
              </th>
              <th className="cursor-pointer py-3 font-semibold" onClick={() => requestSort("psr")}>
                <div className="flex cursor-pointer items-center gap-2 px-6 py-3 font-semibold text-foreground">
                  PSR{" "}
                  {sortConfig.key === "psr" &&
                    (sortConfig.direction === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                </div>
              </th>
              <th className="cursor-pointer py-3 font-semibold" onClick={() => requestSort("dividend")}>
                <div className="flex cursor-pointer items-center gap-2 px-6 py-3 font-semibold text-foreground">
                  Dividend Yield{" "}
                  {sortConfig.key === "dividend" &&
                    (sortConfig.direction === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                </div>
              </th>
              <th className="cursor-pointer py-3 font-semibold" onClick={() => requestSort("pActive")}>
                <div className="flex cursor-pointer items-center gap-2 px-6 py-3 font-semibold text-foreground">
                  P/Ativo{" "}
                  {sortConfig.key === "pActive" &&
                    (sortConfig.direction === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                </div>
              </th>
              <th className="cursor-pointer py-3 font-semibold" onClick={() => requestSort("pWorkCapital")}>
                <div className="flex cursor-pointer items-center gap-2 px-6 py-3 font-semibold text-foreground">
                  P/Capital de Giro{" "}
                  {sortConfig.key === "pWorkCapital" &&
                    (sortConfig.direction === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {dataListStocks.content.length > 0 ? (
              dataListStocks.content.map((stock, index) => (
                <tr key={index} className="border-b p-2 transition-colors hover:bg-primary/20">
                  <TableCell className="pl-4">
                    <div className="flex items-center gap-2">
                      <ChartCandlestick className="h-8 w-8 text-indigo-600" />
                      <div className="flex flex-col py-2">
                        <h2 className="text-sm font-medium text-foreground">{stock.paper}</h2>
                      </div>
                    </div>
                  </TableCell>

                  <td className="whitespace-nowrap px-6 py-4 text-left text-foreground">
                    R$ {parseFloat(stock.quotation).toFixed(2)}
                  </td>

                  <td className="px-6 py-4 text-left text-foreground">{parseFloat(stock.pL).toFixed(2)}</td>

                  <td className="px-6 py-4 text-left text-foreground">{parseFloat(stock.pVp).toFixed(2)}</td>

                  <td className="px-6 py-4 text-left text-foreground">{parseFloat(stock.psr).toFixed(2)}</td>

                  <TableCell className="pl-4">
                    <div className="flex w-fit flex-col items-end">
                      <span className="font-semibold text-green-500">{stock.dividend}</span>
                    </div>
                  </TableCell>

                  <td className="px-6 py-4 text-left text-foreground">{parseFloat(stock.pActive).toFixed(2)}</td>

                  <td className="px-6 py-4 text-left text-foreground">{parseFloat(stock.pWorkCapital).toFixed(2)}</td>
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
          className="flex cursor-pointer items-center justify-center rounded-md bg-primary p-2 text-secondary hover:bg-primary/80"
        >
          <ArrowLeft size={16} />
        </button>

        <span className="text-sm font-medium text-primary-t">
          Página {currentPage} de {dataListStocks.totalPages}
        </span>

        <button
          disabled={currentPage === dataListStocks.totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="flex cursor-pointer items-center justify-center rounded-md bg-primary p-2 text-secondary hover:bg-primary/80"
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
