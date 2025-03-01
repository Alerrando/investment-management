"use client";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ChartCandlestick, Medal } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

import Title from "@/components/Title/Title";
import { TableCell } from "@/components/ui/table";
import { initialStateStockProvider } from "@/lib/utils";
import { ListStockModel } from "@/models/Lists/ListStockModel";
import { useListStocksByDividend } from "@/provider/Lists/ListStockBy/ListStockByDividendProvider";
import { useListStocksByLiquidAverage } from "@/provider/Lists/ListStockBy/ListStockByLiquidAverage";
import { useListStocksByMarketValue } from "@/provider/Lists/ListStockBy/ListStockByMarketValueProvider";
import { useListStocksByPL } from "@/provider/Lists/ListStockBy/ListStockByPlProvider";
import { useListStocksByRevenueGrowth } from "@/provider/Lists/ListStockBy/ListStockByRevenueGrowthProvider";
import { useListStocksByRoe } from "@/provider/Lists/ListStockBy/ListStockByRoeProvider";

import SkeletonListStock from "../../ListStocks/SkeletonListStock";

export default function ListPage() {
  const { list } = useParams();
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const { dataListStocksByDividend } = useListStocksByDividend();
  const { dataListStocksByMarketValue } = useListStocksByMarketValue();
  const { dataListStocksByPL } = useListStocksByPL();
  const { dataListStocksByRoe } = useListStocksByRoe();
  const { dataListStocksByLiquidAverage } = useListStocksByLiquidAverage();
  const { dataListStocksByRevenueGrowth } = useListStocksByRevenueGrowth();
  const listStocks = {
    dividend: dataListStocksByDividend,
    "market-value": dataListStocksByMarketValue,
    pl: dataListStocksByPL,
    roe: dataListStocksByRoe,
    "liquid-average": dataListStocksByLiquidAverage,
    "revenue-growth": dataListStocksByRevenueGrowth,
  };

  const dataListStocks: ListStockModel = listStocks[list as keyof typeof listStocks] ?? initialStateStockProvider;

  return (
    <div className="flex h-auto flex-col gap-8 px-8 pt-8">
      <Title name="Todos os Stocks" icon={<Medal size={20} className="text-indigo-600" />} />

      <div className="flex flex-col gap-2">
        <div className="h-[400px] w-full overflow-auto">
          <table className="h-full w-full table-auto border-collapse text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="sticky top-0 z-10 bg-gray-800 text-white dark:bg-gray-900">
              <tr>
                <th onClick={() => requestSort("paper")}>
                  <div className="flex cursor-pointer items-center gap-2 px-6 py-3 font-semibold">
                    Nome{" "}
                    {sortConfig.key === "paper" &&
                      (sortConfig.direction === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                  </div>
                </th>
                <th className="cursor-pointer px-6 py-3 font-semibold" onClick={() => requestSort("quotation")}>
                  <div className="flex cursor-pointer items-center gap-2 px-6 py-3 font-semibold">
                    Cotação{" "}
                    {sortConfig.key === "quotation" &&
                      (sortConfig.direction === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                  </div>
                </th>
                <th className="cursor-pointer px-6 py-3 font-semibold" onClick={() => requestSort("pL")}>
                  <div className="flex cursor-pointer items-center gap-2 px-6 py-3 font-semibold">
                    P/L{" "}
                    {sortConfig.key === "pL" &&
                      (sortConfig.direction === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                  </div>
                </th>
                <th className="px-6 py-3 font-semibold">P/VP</th>
                <th className="px-6 py-3 font-semibold">PSR</th>
                <th className="px-6 py-3 font-semibold">Dividend Yield</th>
                <th className="px-6 py-3 font-semibold">P/Ativo</th>
                <th className="px-6 py-3 font-semibold">P/Capital de Giro</th>
                <th className="px-6 py-3 font-semibold">P/EBIT</th>
                <th className="px-6 py-3 font-semibold">P/Ativo Circulante Líquido</th>
                <th className="px-6 py-3 font-semibold">EV/EBIT</th>
                <th className="px-6 py-3 font-semibold">EV/EBITDA</th>
                <th className="px-6 py-3 font-semibold">Margem EBIT</th>
                <th className="px-6 py-3 font-semibold">Margem Líquida</th>
                <th className="px-6 py-3 font-semibold">Liquidez Corrente</th>
                <th className="px-6 py-3 font-semibold">ROIC</th>
                <th className="px-6 py-3 font-semibold">ROE</th>
                <th className="px-6 py-3 font-semibold">Liquidez 2 Meses</th>
                <th className="px-6 py-3 font-semibold">Patrimônio Líquido</th>
                <th className="px-6 py-3 font-semibold">Dívida Líquida/Patrimônio</th>
                <th className="px-6 py-3 font-semibold">Crescimento Receita (5 anos)</th>
                <th className="px-6 py-3 font-semibold">Dívida Líquida/EBITDA</th>
                <th className="px-6 py-3 font-semibold">Valor de Mercado</th>
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

                    <td className="whitespace-nowrap px-6 py-4 text-right text-gray-800 dark:text-white">
                      R$ {parseFloat(stock.quotation).toFixed(2)}
                    </td>

                    <td className="px-6 py-4">{parseFloat(stock.pL).toFixed(2)}</td>

                    <td className="px-6 py-4">{parseFloat(stock.pVp).toFixed(2)}</td>

                    <td className="px-6 py-4">{parseFloat(stock.psr).toFixed(2)}</td>

                    <TableCell className="pl-4">
                      <div className="flex w-fit flex-col items-end">
                        <span className="font-semibold text-green-500">{stock.dividend}</span>
                      </div>
                    </TableCell>

                    <td className="px-6 py-4">{parseFloat(stock.pActive).toFixed(2)}</td>

                    <td className="px-6 py-4">{parseFloat(stock.pWorkCapital).toFixed(2)}</td>

                    <td className="px-6 py-4">{parseFloat(stock.pEbit).toFixed(2)}</td>

                    <td className="px-6 py-4">{parseFloat(stock.pLiquidCurrentAssets).toFixed(2)}</td>

                    <td className="px-6 py-4">{parseFloat(stock.evEbit).toFixed(2)}</td>

                    <td className="px-6 py-4">{parseFloat(stock.evEbitda).toFixed(2)}</td>

                    <td className="px-6 py-4">{stock.ebitMargin}</td>

                    <td className="px-6 py-4">{stock.liquidMargin}</td>

                    <td className="px-6 py-4">{parseFloat(stock.liquidCurrent).toFixed(2)}</td>

                    <td className="px-6 py-4">{stock.roic}</td>

                    <td className="px-6 py-4">{stock.roe}</td>

                    <td className="px-6 py-4">{stock.liquid2Month}</td>

                    <td className="px-6 py-4">
                      {parseFloat(stock.liquidWorth).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>

                    <td className="px-6 py-4">{parseFloat(stock.liquidDebtEquity).toFixed(2)}</td>

                    <td className="px-6 py-4">{stock.revenueGrowth5Years}</td>

                    <td className="px-6 py-4">{parseFloat(stock.liquityDebtEbitida || "0").toFixed(2)}</td>

                    <TableCell className="pl-4">
                      <div className="flex flex-col items-end">
                        <span className="font-semibold text-green-500">
                          {parseFloat(stock.marketValue).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </span>
                      </div>
                    </TableCell>
                  </tr>
                ))
              ) : (
                <SkeletonListStock />
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end gap-4">
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
