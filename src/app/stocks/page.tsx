"use client";
import { ChartCandlestick, Medal } from "lucide-react";

import Spinner from "@/components/Spinner/Spinner";
import Title from "@/components/Title/Title";
import { TableCell } from "@/components/ui/table";
import { useListStocks } from "@/provider/ListStockProvider";

export default function AllStocksPage() {
  const { dataListStocks, isLoadingListStocks } = useListStocks();

  return (
    <div className="flex h-[calc(100vh_-_53px)] flex-col gap-8 border px-8 pt-8 dark:border-[#444444] dark:bg-[#2C2C2C]">
      <Title name="Todos os Stocks" icon={<Medal size={20} className="text-indigo-600" />} />

      <div className="h-full overflow-y-auto">
        <table className="h-full w-full table-auto border-collapse text-left text-sm text-gray-600 dark:text-gray-300">
          <thead className="sticky top-0 z-10 bg-gray-800 text-white dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 font-semibold">Nome</th>
              <th className="px-6 py-3 font-semibold">Cotação</th>
              <th className="px-6 py-3 font-semibold">P/L</th>
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
            {!isLoadingListStocks && (
              <>
                {dataListStocks.map((stock, index) => (
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
                ))}
              </>
            )}
          </tbody>
        </table>

        {isLoadingListStocks && <Spinner />}
      </div>
    </div>
  );
}
