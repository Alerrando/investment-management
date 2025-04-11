"use client";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ChartCandlestick } from "lucide-react";
import { useMemo, useState } from "react";

import SkeletonReusable from "@/components/SkeletonReusable/SkeletonReusable";
import { TableCell } from "@/components/ui/table";
import { ListStockModelContent } from "@/models/Lists/ListStockModel";
import { useListStocks } from "@/provider/Lists/ListStockProvider";

interface SortConfigProps {
  key: keyof ListStockModelContent;
  direction: "asc" | "desc";
}

export default function ListStocks() {
  const { dataListStocks } = useListStocks();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfigProps>({ key: "paper", direction: "asc" });

  const sortedStocks = useMemo(() => {
    if (dataListStocks.content) return [];
    if (!sortConfig.key) return dataListStocks?.content;

    const sortedData: ListStockModelContent[] = [...dataListStocks.content];
    sortedData.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return sortedData;
  }, [sortConfig, dataListStocks?.content]);

  return (
    <>
      <div className="h-[400px] w-full overflow-auto">
        <table className="w-full table-auto border-collapse text-left text-sm">
          <thead className="sticky top-0 z-10 bg-tertiary">
            <tr>
              <th onClick={() => requestSort("paper")}>
                <div className="flex cursor-pointer items-center gap-2 px-6 py-3 font-semibold text-background">
                  Nome{" "}
                  {sortConfig.key === "paper" &&
                    (sortConfig.direction === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                </div>
              </th>
              <th className="py-3" onClick={() => requestSort("quotation")}>
                <div className="flex cursor-pointer items-center gap-2 px-6 py-3 font-semibold text-background">
                  Cotação{" "}
                  {sortConfig.key === "quotation" &&
                    (sortConfig.direction === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                </div>
              </th>
              <th className="cursor-pointer py-3 font-semibold" onClick={() => requestSort("pL")}>
                <div className="flex cursor-pointer items-center gap-2 px-6 py-3 font-semibold text-background">
                  P/L{" "}
                  {sortConfig.key === "pL" &&
                    (sortConfig.direction === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                </div>
              </th>
              <th className="cursor-pointer py-3 font-semibold" onClick={() => requestSort("pVp")}>
                <div className="flex cursor-pointer items-center gap-2 px-6 py-3 font-semibold text-background">
                  P/VP{" "}
                  {sortConfig.key === "pVp" &&
                    (sortConfig.direction === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                </div>
              </th>
              <th className="cursor-pointer py-3 font-semibold" onClick={() => requestSort("psr")}>
                <div className="flex cursor-pointer items-center gap-2 px-6 py-3 font-semibold text-background">
                  PSR{" "}
                  {sortConfig.key === "psr" &&
                    (sortConfig.direction === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                </div>
              </th>
              <th className="cursor-pointer py-3 font-semibold" onClick={() => requestSort("dividend")}>
                <div className="flex cursor-pointer items-center gap-2 px-6 py-3 font-semibold text-background">
                  Dividend Yield{" "}
                  {sortConfig.key === "dividend" &&
                    (sortConfig.direction === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                </div>
              </th>
              <th className="cursor-pointer py-3 font-semibold" onClick={() => requestSort("pActive")}>
                <div className="flex cursor-pointer items-center gap-2 px-6 py-3 font-semibold text-background">
                  P/Ativo{" "}
                  {sortConfig.key === "pActive" &&
                    (sortConfig.direction === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                </div>
              </th>
              <th className="cursor-pointer py-3 font-semibold" onClick={() => requestSort("pWorkCapital")}>
                <div className="flex cursor-pointer items-center gap-2 px-6 py-3 font-semibold text-background">
                  P/Capital de Giro{" "}
                  {sortConfig.key === "pWorkCapital" &&
                    (sortConfig.direction === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {dataListStocks.content.length > 0 ? (
              sortedStocks.map((stock, index) => (
                <tr key={index} className="border-b p-2 transition-colors hover:bg-primary/20">
                  <TableCell className="pl-4">
                    <div className="flex items-center gap-2">
                      <ChartCandlestick className="h-8 w-8 text-indigo-600" />
                      <div className="flex flex-col py-2">
                        <h2 className="text-sm font-medium text-primary-t">{stock.paper}</h2>
                      </div>
                    </div>
                  </TableCell>

                  <td className="whitespace-nowrap px-6 py-4 text-left text-primary-t">
                    R$ {parseFloat(stock.quotation).toFixed(2)}
                  </td>

                  <td className="px-6 py-4 text-left text-primary-t">{parseFloat(stock.pL).toFixed(2)}</td>

                  <td className="px-6 py-4 text-left text-primary-t">{parseFloat(stock.pVp).toFixed(2)}</td>

                  <td className="px-6 py-4 text-left text-primary-t">{parseFloat(stock.psr).toFixed(2)}</td>

                  <TableCell className="pl-4">
                    <div className="flex w-fit flex-col items-end">
                      <span className="font-semibold text-green-500">{stock.dividend}</span>
                    </div>
                  </TableCell>

                  <td className="px-6 py-4 text-left text-primary-t">{parseFloat(stock.pActive).toFixed(2)}</td>

                  <td className="px-6 py-4 text-left text-primary-t">{parseFloat(stock.pWorkCapital).toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <SkeletonReusable classNameBody="h-6" hasTBody tableBodyJust sizeBody={10} sizeBodyChild={8} />
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

  function requestSort(key: keyof ListStockModelContent) {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  }
}
